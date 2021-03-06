# MultiMedia-Accessibility
## Creating audio, movies and tv show accessible for everyone.

## Accessibility Findings

### Video - 

-All video that is image based need to have caption options. Captions are different from subtitle as captions are targeted towards the deaf or hard of hearing. Captions add in descriptions of important noises and sounds as well as speach.

-VTT files are used to created captioning along with the <track> element is how we create captions. These captions should be able to toggle on and off so everyone can have a pleasant viewing experience.

-A transcript is also a very important component to video.

-The control bar needs to be accessible through keyboard only controls and must have arial labels if the button labels would not be descriptive enough for a screen reader. 

-Video should by default be stopped when you arrive on the page. 

-Audio should be mutable.


### Audio - 

-Like video captions should be created for audio elements so that they are accessible via metadata.

-A transcript is even more important for audio elements so that it can be read by screen readers.

-The control bar needs to be accessible through keyboard only controls and must have arial labels if the button labels would not be descriptive enough for a screen reader. 

-Audio should not be playing when you arrive on the page and should always be mutable and stoppable once it starts.


### General - 

-Proper semantic HTML should be used with sectioning elements. Aria areas can be added to help screen readers know where they are on the page. 

-Colours should have high contrast. 

-Large amounts of text should not be in all caps to help users with dyslexia or ADHD be able to more easily read content.  
