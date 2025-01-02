#!/usr/bin/env python
# coding: utf-8

# In[73]:


import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import sklearn
from sklearn.preprocessing import Normalizer
import torch
import mglearn
from collections import Counter
from kiwipiepy import Kiwi, TypoTransformer, TypoDefinition
import re
import pandas as pd
import json
import numpy as np
from kiwipiepy.utils import Stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# In[103]:


normalizer = Normalizer()
clustered_dong = pd.read_json("./data/군집상권데이터.json")
menu_ingred = pd.read_json("./data/메뉴_추상설명_재료_1.json")
tokenized_data = data_tokenizing(menu_ingred)

app = Flask(__name__)
CORS(app)  # 모든 도메인에서의 요청 허용

# REST API key
KAKAO_API_KEY = "015412fbc48c3a4e31b1926b6adb667e"

def get_dong_number(latitude, longitude, dong_data=clustered_dong):
    url = f"https://dapi.kakao.com/v2/local/geo/coord2address.json?x={longitude}&y={latitude}"
    headers = {"Authorization": f"KakaoAK {KAKAO_API_KEY}"}

    response = requests.get(url, headers=headers)
    # 200번 : 통신 성공
    if response.status_code == 200:
        address_info = response.json()
        # 카카오 api에 해당 좌표 정보가 있는지 확인
        if address_info['documents']:
            addr =  address_info['documents'][0]['address']['address_name']
            region = addr.split(" ")[0]
            gu = addr.split(" ")[1]
            dong = addr.split(" ")[2]
            
            region_dong = dong_data[dong_data["지역"].str.contains(region)]
            dong_number = list(region_dong[region_dong["동 이름"]==dong].head(1)["법정동 번호(PK)"])[0]
            return dong_number
    return None



# 1. 유사 상권 탐색
# 스프링 부트로부터 사용자가 클릭한 좌표 정보를 전달받아 동을 찾은 후 분석하고 전송
@app.route('/send-coordinates', methods=['POST'])
def receive_coordinates():
    # 클라이언트로부터 받은 데이터(현 위치 위도, 경도)
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    
    url = f"https://dapi.kakao.com/v2/local/geo/coord2address.json?x={longitude}&y={latitude}"
    headers = {"Authorization" : f"KakaoAK {KAKAO_API_KEY}"}
    
    response = requests.get(url, headers=headers)
    
    
    dong_number = get_dong_number(latitude, longitude)
    if(dong_number == None):
        return jsonify({"status" : "error", "message" : "현재 지역의 법정동 번호를 찾을 수 없습니다."})
    
    # 유사 상권의 법정동 번호
    similar_dongs = yusa_dong(clustered_dong, dong_number)
    
    # 스트링 부트로 전달
    spring_response = similar_dong_send_to_spring(similar_dongs)
    if(spring_response.get("status")=="success"):
        return jsonify({"status":"success",
                        "keyword":keyword,
                        "recommanded":recommanded
                       })
    else:
        return jsonify({
            "status" : "error",
            "keyword" : keyword,
            "message" : spring_response.get("error")
        })
        

# 분석한 유사 상권 정보 전달
def similar_dong_send_to_spring(similar_dongs):
    spring_url = "http://localhost:8087/api/receive-similar-dongs"
    # 스프링에 dong이라는 이름으로 dong_name 데이터 전송
    payload = {"similarDongs":similar_dongs}
    # json 형식으로 전송
    headers = {"Content-Type" : "application/json"}
    print(payload)
    try:
        response = requests.post(spring_url, json=payload, headers=headers)
        response.raise_for_status() # HTTP 오류 있는지 확인 => 예외 발생
        return {"status":"success", "message":"스프링으로 전송 완료"}
    except Exception as e:
        # 예외처리
        print(f"스프링 전송 실패: {str(e)}")
        return {"status":"error", "error":str(e)}

# 스프링 부트로부터 키워드 전달받아 분석
@app.route("/analyze-keyword", methods=["POST"])
def analyze_keyword():
    # 요청 본문 데이터 확인
    data = request.get_json()
    keyword = data.get("keyword", "")
    recommanded = input_simil(tokenized_data, keyword)
    
    spring_response = keyword_menu_send_to_spring(keyword, recommanded)
    if(spring_response.get("status")=="success"):
        return jsonify({"status":"success",
                        "keyword":keyword,
                        "recommanded":recommanded
                       })
    else:
        return jsonify({
            "status" : "error",
            "keyword" : keyword,
            "message" : spring_response.get("error")
        })

# 키워드 추천 메뉴 전송
def keyword_menu_send_to_spring(keyword, recommanded):
    spring_url = "http://localhost:8087/api/receive-keyword-menu"
    payload = {
        "keyword" : keyword,
        "recommanded":recommanded
    }
    # json 형식으로 전송
    headers = {"Content-Type" : "application/json"}
    print(payload)
    try:
        response = requests.post(spring_url, json=payload, headers=headers)
        response.raise_for_status()
        return {"status":"success", "message":"스프링으로 전송 완료"}
    except Exception as e:
        # 예외처리
        print(f"스프링 부트 전송 실패: {str(e)}")
        return {"status":"error", "error":str(e)}

if __name__ == '__main__':
    app.run(host='localhost', port=5000)


# In[ ]:





# In[30]:


def yusa_dong(clustered_dong, dong_pk):
    target_dong_index = clustered_dong[clustered_dong["법정동 번호(PK)"]==dong_pk].index[0]

    same_cluster_dong = clustered_dong[clustered_dong["군집"]==clustered_dong.iloc[target_dong_index,-1]]
    simil_data = same_cluster_dong.iloc[:,3:-1]
    simil_data_scaled = normalizer.fit_transform(simil_data)

    train_tensor = torch.tensor(simil_data_scaled, dtype=torch.float64)
    euclidean_distances = torch.cdist(train_tensor[target_dong_index].unsqueeze(0), train_tensor).squeeze()
    top_idx = np.argsort(euclidean_distances)[1:10]

    return [int(clustered_dong["법정동 번호(PK)"].iloc[int(idx)]) for idx in top_idx]


# In[74]:


def kiwi_tokenizer(sentence, tokenizer=Kiwi(typos="basic")):
    sentence = sentence.replace(" ","")
    stopwords=Stopwords()
    get_tags = ["XR", "NNG", "VA"]
    sentence = tokenizer.space(sentence)
    
    kiwi_result = tokenizer.tokenize(sentence, normalize_coda = True, stopwords=stopwords)
    token_list = []
    for token in range(len(kiwi_result)):
        if(kiwi_result[token].tag in get_tags):
            token_list.append(kiwi_result[token].form)
    token_str = " ".join(token_list)
    return token_str


# In[100]:


def input_simil(data, input_data, num=10):
    
    input_token = kiwi_tokenizer(input_data)
    text_vector = np.array(data["menu"]+" "+data["info"])
    t_vector = np.insert(text_vector, 0, input_token)
    
    tfidfv=TfidfVectorizer().fit_transform(t_vector)
    
    # 일반 연산을 한 경우 내적 값이 매우 작은 경우 오류가 발생하여 사이킷 런의 모듈 사용
    cosine_simil = cosine_similarity(tfidfv[0], tfidfv)[0]

    # 자기 자신은 제외(가장 값이 큰 요소)하고 값이 높은 순으로 정렬
    simil_index = np.flip(np.argpartition(cosine_simil, kth=-1)[:-1])
    simil_index -=1
    
    if(cosine_simil[simil_index[0]+1]<0.2):
        return "유사한 메뉴가 존재하지 않습니다..."
    else:
        return list(data.iloc[simil_index[:num],0])


# In[101]:


def info_simil(data, menu_name, num=10):
    pick = menu_name
    pick_idx = data[data["menu"]==pick].index
    
    tfidfv=TfidfVectorizer().fit_transform(data["info"])
    tfidf_result = np.array(tfidfv.todense())
    
    # 단어의 출현 순서에 영향을 받지 않기 위해 코사인 유사도 사용
    cosine_simil = []
    for i in range(len(tfidf_result)):
        # 두 벡터의 내적값을 원점에서의 각 벡터까지의 거리 곱으로 나눔 => 코사인 유사도
        cosine_i = np.dot(tfidf_result[pick_idx], tfidf_result[i])/(np.linalg.norm(tfidf_result[pick_idx])*np.linalg.norm(tfidf_result[i]))
        cosine_simil.append(cosine_i[0])
    
    cosine_simil = np.array(cosine_simil)
    # 자기 자신은 제외(가장 값이 큰 요소)하고 값이 높은 순으로 정렬
    simil_index = np.flip(np.argpartition(cosine_simil, kth=-1))
    
    if(cosine_simil[simil_index[1]]<0.2):
        return data[data["menu"]=="-1"]
    else:
        return data.iloc[simil_index[:num]]


# In[99]:


def ingred_sim(data, menu_name, num=10):
    info_sim = info_simil(menu_data, menu_name, 50)
    if(len(info_sim["menu"])==0):
        return "유사한 메뉴가 존재하지 않습니다..."

    tfidfv=TfidfVectorizer().fit_transform(info_sim["info"])
    tfidf_result = np.array(tfidfv.todense())

    ingred_simil = []
    for i in range(len(tfidf_result)):
        cosine_i = np.dot(tfidf_result[0], tfidf_result[i])/(np.linalg.norm(tfidf_result[0])*np.linalg.norm(tfidf_result[i]))
        ingred_simil.append(cosine_i)
    ingred_simil = np.array(ingred_simil)
    ingred_simil_index = np.flip(np.argpartition(ingred_simil, kth=-1)[:-1])
    
    if(ingred_simil[ingred_simil_index[0]]<0.2):
        return "유사한 메뉴가 존재하지 않습니다..."
    else:
        return list(info_sim.iloc[ingred_simil_index[:num],0])


# In[96]:


def data_tokenizing(data):
    data["ingred"] = data["ingred"].replace('\'', '', regex=True)
    kiwi = Kiwi()
    for i in range(len(data["info"])):
        data.iloc[i,1] = kiwi_tokenizer(data["info"][i], tokenizer = kiwi)
    return data


# In[ ]:




