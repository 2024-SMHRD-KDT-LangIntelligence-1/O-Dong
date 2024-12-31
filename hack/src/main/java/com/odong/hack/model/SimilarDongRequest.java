package com.odong.hack.model;

import java.util.List;

public class SimilarDongRequest {
    private List<String> similarDongs;
    public SimilarDongRequest(){}

    public List<String> getSimilarDongs(){
        return similarDongs;
    }

    public void setSimilarDongs(List<String> similarDongs){
        this.similarDongs = similarDongs;
    }
}
