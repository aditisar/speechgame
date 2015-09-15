# Speech Games

I worked on this final project for Physical Computing Studio (48-390) at CMU in Spring 2015 with Aaron Balderas. It is a game intended for ESL students to practice English vocabulary. 

The game requires custom built buzzers (connected via serial ports) to be played. The arduino code for the buzzers is [here](https://github.com/aebalderas/speechgame-hardware).

Check out the original [concept video](https://www.youtube.com/channel/UCKscJCE9PgWuSFp18LEgECg) and the [final project video](https://www.youtube.com/watch?v=iop9n9SMDq8), too! 

## Background

The basis of the game is a physical-visual way for ESL (English Second Language) students to be able to practice their English vocabulary in a way that makes vocabulary fun. The game was comprised of hardware and software working together to make a “buzzer” game for rapid practice of common English vocabulary -- in our implementation we demonstrated colors vocabulary. The hardware for the project consisted of 2 Arduino Unos, 2 LED bar graphs, 2 pushbuttons, and machine serial ports. The software called for the implementation of a Node web application that relayed information from the machine’s serial to the web app’s UI for the game to be played. Extensive research was done to implement the software layer in order to successfully code the game’s hardware and software layers.

### Implementation - Software

All the software code is in this repo.

#### Speech Recognition

We used pocketsphinx.js (https://github.com/syl22-00/pocketsphinx.js) as our speech recognition library (our choice is explained in the limitations section below). Sphinx is a project out of Carnegie Mellon University that includes a wide range of speech recognition tools - pocketSphinx is a lightweight speech recognition engine, and pocketSphinx.js is a Javascript version of pocketSphinx that runs entirely in the client side browser. We modified the demo app (https://github.com/syl22-00/pocketsphinx.js/tree/master/webapp) and used node.js to develop a browser based game.

pocketSphinx requires a list of words and their phonetic pronunciations to guess from. To generate this list, we used the LOGIOS Lexicon Tool (http://www.speech.cs.cmu.edu/tools/lextool.html) to generate a pronounciation dictionary for a given list of words (we used a list of colors). We wrote a python script that parsed this phoneme dictionary into the appropriate data structures that pocketsphinx.js required.

#### Game Logic

A color is displayed on the screen, and both players have the opportunity to “buzz in” if they know what the color is. Players can use the physical buzzers or click on the corresponding button in the UI. Once they buzz in, they have three seconds to say the color name aloud and if pocketsphinx correctly identifies it, it is marked as correct and that player is awarded a point. The color changes every turn and is randomly selected from the phoneme dictionary we provided to pocketsphinx.js.

### Implementation - Hardware

Arduino Uno and Circuit Construction

The controller circuitry for the game consisted of 10x30 pin breadboards, 10 220𝛀 resistors, 1 10K𝛀 resistor, a pushbutton, and an LED bar graph. The 10 220𝛀 resistors were used for each of the LED lights within the LED bar. The circuit diagram in the figure below details how the LED bar’s anodes and cathodes receive power input -- the 220𝛀 resistors are receive power after exiting the cathodes.

### Hardware/Software Interface

We used 2 Arduino Uno microcontrollers, 2 LED bars, created game controller casings, and pushbuttons.

The Arduino Unos were set up to communicate via USB to the machine and the machine to the Node web application. The figure below details the general relay of information for the game.

Whenever the players “buzzed” in on their game controllers, the pushbutton relayed to the Arduino that the button was pressed and the Arduino to the machine’s serial port. The Node app could then distinguish which player had buzzed in (P1 or P2) based on the serial port specified with the incoming information. If P1 or P2 buzzed in, the Node logic would display that in the web apps’ UI by displaying P1 or P2.

We used the serial npm module to handle serial communication between the buzzer and web server. The server and client were connected using socket.io. We had two way communication - a buzzer press sends data via serial to the server, the server parses the data and looks for a specific value indicating a “buzz,” then emits a “buzz” event to the client which triggers the microphone on the web browser. Similarly, the server is listening for any change in player’s total points on the client side, and relays the information to the Arduino in the buzzer, which in turn lights up an LED array appropriately.

##Discussion

###Limitations

One of the biggest hurdles we faced was picking a speech recognition library. We originally intended for this to be a native mobile application - players would be able to speak into their phones and receive satisfying/incentivizing physical feedback (possibly in the form of a board game). We looked at Nuance, an openFrameworks addon called ofxASR, and using the built in speech recognition in iPhones. We weren’t able to get an API key for Nuance in time, ran into several issues installing ofxASR, and realized we couldn’t use the built in speech recognition because of the built in autocorrect (we wanted a system that would identify misspoken words as well). 
We also faced challenges with pocketsphinx.js, one example being: the larger the list of potential words the engine received, the harder it was for it to distinguish between words, thus, resulting in an unusable/untestable product. Our system had more trouble identifying some words than others - for example, the words “orange” and “purple” were rarely identified. We should have tweaked the phoneme representations of these words to catch a wider set of possible pronounciations.

###Lessons Learned

We got to practice node.js skills (code on github will be cleaned up soon). 
An important lesson is that iteration is key - I think our project would have benefited from a couple more rounds of critique. The gameplay ended up being more absurd and fun than an actual learning experience. 
The project served as a way to learn more about how Arduino microcontrollers communicate via serial -- specifically in a 3 part way in which the microcontroller, machine serial, and a web application all communicate.

###Future Work

In terms of hardware, more work would be devoted to finding a more rewarding physical input and feedback mechanism that not only makes the game more fun but actually makes a difference into the learning comprehension of the user. In terms of software, more work would be devoted to analyzing the data received by user input, speech, and patterns to display data analytics for the user or to modify the game in such a way that would aid learning. 
Identifying a better mode of physical feedback than the LED array and improving the recognition system are the two key areas that would benefit from more work. Choosing a better physical representation/iterating the hardware portion of our project would also have been beneficial. Learning more about how ESL students are taught vocabulary and looking into existing games of this nature would have informed this decision. Instead of using a buzzer, players could just use their phones/tablets to play, given the ubiquity of handheld devices today.

###Conclusion

The speech recognition project proved to be difficult but very rewarding. The two main difficulties -- presented previously -- were the lack of speech recognition engines which did not become confused with a word input of increasing size while the other was coming up with a productive physical input/feedback mechanism for the user.

However, the implementation of the speech game as it stands does serve not only as a fun game (even for adults, see video) but also does aid in the learning of colors and speed. The project served as a way to learn more about how Arduino microcontrollers communicate via serial -- specifically in a 3 part way in which the microcontroller, machine serial, and a web application all communicate.

