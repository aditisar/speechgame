

def loadDictionary( path='./state-capitals.dict.txt' ):
    dictionary = []
    for line in open( path ):
    	line = line[:-1] #get rid of newline
    	word = line.split('\t')[0] #split on tab to get word
    	phonemes = ' '.join(line.split('\t')[1:]) #get everything after tab 
    	dictionary.append([word,phonemes])
    return dictionary

words=loadDictionary()

def createGrammar():
	grammars = []
	for pair in words: 
		grammar = {}
		grammar['from'] = 0
		grammar['to'] = 0
		grammar['word'] = pair[0]
		grammars.append(grammar)
	return grammars

grammarTransitions = createGrammar()

def stripQuotes():
	gt = str(grammarTransitions)
	gt = gt.replace("'from'","from");
	gt = gt.replace("'to'", "to");
	gt = gt.replace("'word'", "word");
	#print(gt)
	return gt

gt = stripQuotes()

#writes to a javascript file that can be included in live.html
file = open("parsedList.js", "w")
file.write("var words = ")
file.write(str(words))
file.close()

file = open("grammar.js", "w")
file.write("var gt = ")
file.write(gt)
file.close()


def makeInto2DArray( path='./stateandcapital.txt' ):
    statecapitals = []
    for line in open( path ):
    	line = line[:-1] #get rid of newline
    	state = line.split(' ')[0].upper() #split on tab to get state
    	capital = line.split(' ')[1].upper()
    	statecapitals.append([state,capital])
    return statecapitals

statecapitals = makeInto2DArray()

file = open("statecapitalsArray.js", "w")
file.write("var statecapitals = ")
file.write(str(statecapitals))
file.close()


