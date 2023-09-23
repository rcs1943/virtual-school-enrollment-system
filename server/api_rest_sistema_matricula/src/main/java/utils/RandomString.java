package utils;

import java.util.Arrays;
import java.util.Collections;


public class RandomString {
    private String[] charGroups = { 
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
        "abcdefghijklmnopqrstuvwxyz",  
        "1234567890" 
    };
    public String generate(int length){
        String valueStr = "";
        
        int module = length % 3;
        int amountCharacter = (length - module) / 3;

        for (int i = 0; i < charGroups.length; i++) {
            valueStr = random(valueStr, i, amountCharacter);
        }
        valueStr = random(valueStr, getRandomInteger(charGroups.length), module);
        
        String[] arrayWord = valueStr.split("");
        Collections.shuffle(Arrays.asList(arrayWord));
        valueStr = "";
        for (int i = 0; arrayWord.length > i; i++) {
            valueStr = valueStr + arrayWord[i];
        }
        return valueStr;
        
    }
    private int getRandomInteger(double value) {
        return (int) (Math.random() * value);
    }
    private String random(String newValue, final int idxCharGroup, final int amount) {
        String[] arrayLetter = charGroups[idxCharGroup].split("");
        int numberRandom = 0;
        for (int i = 0 ; i < amount ; i++) {
            numberRandom = getRandomInteger(arrayLetter.length - 1);
            newValue = newValue + arrayLetter[numberRandom];
        }
        return newValue;
    }
}
