#!/bin/usr/env python
from __future__ import absolute_import

def find_disease(sentence):
    diseases = [ "unknown", "other", "anthrax cutaneous", "anthrax gastrointestinous", "anthrax inhalation",
            "botulism", "brucellosis", "chikungunya", "cholera", "cryptococcosis", "cryptosporidiosis", 
            "crimean-congo haemorrhagic fever", "dengue", "diphteria", "ebola haemorrhagic fever", "ehec",
            "e.coli", "enterovirus 71 infection", "influenza a/h5n1", "h5n1", "influenza a/h7n9", "h7n9",
            "influenza a/h9n2", "h9n2", "influenza a/h1n1", "h1n1", "influenza a/h1n2", "h1n2", "influenza a/h3n5",
            "h3n5", "influenza a/h3n2", "h3n2", "influenza a/h2n2", "h2n2", "hand, foot and mouth disease", 
            "hand disease", "foot disease", "mouth disease", "hantavirus", "hepatitis a", "hepatitis b",
            "hepatitis c", "hepatitis d", "hepatitis e", "histoplasmosis", "hiv/aids", "hiv", "aids", "lassa fever",
            "malaria", "marburg virus disease", "measles", "mers-cov", "mumps", "nipah virus", "norovirus infection",
            "pertussis", "plague", "pneumococcus pneumonia", "poliomyelitis", "q fever", "rabies", "rift valley fever",
            "rotavirus infection", "rubella", "salmonellosis", "sars", "shigellosis", "smallpox", "staphylococcal enterotoxin b",
            "thypoid fever", "tuberculosis", "tularemia", "vaccinia and cowpox", "vaccinia", "cowpox", "varicella",
            "west nile virus", "yellow fever", "yersiniosis", "zika", "legionares", "listeriosis", "monkeypox", "2019 nCoV",
            "COVID-19", "coronavirus"]

    found_word = []

    for word in diseases:
        if word in sentence:
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