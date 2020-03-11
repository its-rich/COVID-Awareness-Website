#!/bin/usr/env python

def find_disease(sentence):
    diseases = [ "Unknown", "Other", "Anthrax cutaneous", "Anthrax gastrointestinous", "Anthrax inhalation",
            "Botulism", "Brucellosis", "Chikungunya", "Cholera", "Cryptococcosis", "Cryptosporidiosis", 
            "Crimean-congo haemorrhagic fever", "Dengue", "Diphteria", "Ebola haemorrhagic Fever", "ebola virus", "Ehec",
            "E.coli", "Enterovirus 71 infection", "Influenza a/h5n1", "h5n1", "Influenza a/h7n9", "h7n9",
            "Influenza a/h9n2", "h9n2", "Influenza a/h1n1", "h1n1", "Influenza a/h1n2", "h1n2", "Influenza a/h3n5",
            "h3n5", "Influenza a/h3n2", "h3n2", "Influenza a/h2n2", "h2n2", "hand, foot and mouth disease", 
            "Hand disease", "Foot disease", "Mouth disease", "Hantavirus", "hepatitis a", "hepatitis b",
            "hepatitis c", "hepatitis d", "hepatitis e", "histoplasmosis", "hiv/aids", "hiv", "aids", "lassa fever",
            "malaria", "marburg virus disease", "measles", "mers-cov", "mumps", "nipah virus", "norovirus infection",
            "pertussis", "plague", "pneumococcus pneumonia", "poliomyelitis", "q fever", "rabies", "rift valley fever",
            "rotavirus infection", "rubella", "salmonellosis", "sars", "shigellosis", "smallpox", "staphylococcal enterotoxin b",
            "thypoid fever", "tuberculosis", "tularemia", "vaccinia and cowpox", "vaccinia", "cowpox", "varicella",
            "west nile virus", "yellow fever", "yersiniosis", "zika", "legionares", "listeriosis", "monkeypox", "2019 nCoV",
            "COVID-19", "coronavirus"]

    found_word = []
    if sentence is not None:
        word_sentence = sentence.lower()
        for word in diseases:
            if word.lower() in word_sentence:
                found_word.append(word)
        
    return found_word

def find_syndrome(text):
    syndrome = [ "Haemorrhagic Fever", "Acute Flacid Paralysis", "Acute gastroenteritis", "Acute respiratory syndrome",
                "Influenza-like illness", "Acute fever and rash", "Fever of unknown Origin", "Encephalitis", "Meningitis" ]

    found_syn = []

    for word in syndrome:
        if word in text:
            found_syn.append(word)

    return found_syn