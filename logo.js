export function scrollLogo(){
    for(let i = 0; i < 33; i++){
        console.log('\n')
    }
    
    let lines = logo().split('\n');
    let delay = 100; // delay in milliseconds
for (let i = 0; i < lines.length; i++) {
    setTimeout(function() {
        console.log(lines[i]);
    }, delay * i);
}
}

export function logo(){
    return `                                                                                                                                                                                                        
                                                                                                                                                                                                        
    ::^^^^^^^^^^^^^::.:^^^:::^~!~~~~!~^^^^^~^^^^~~^^^^^^^~^^^~^^^^~^^::^^^~!~~~~!~^^:::^^^::^^^^::^^^^::^::                                                    
..             :?5GGGGGGGGGGGGGGGGPPGGPPPPGGGBBBBBBGGGGGGGGGGGGGGGGGGGGGGGGGGPPGGGGPPGGGGBBBBBBGGGGPGGGGGGGGGGGGGGGPPPGGG5?:                               ..                
..                   .              ^PBGGGGGGGGGGGGGGGGGGGPPPGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGPPPGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGP5PGGGGGBP:        .                    .                  
. .                !BGGG5?!75Y!J~5G?!7YP5P5!7YGG77PG?775G?!?PP!YGGJ~7?GGGG?!75Y7??GP!!?GGGGJ~7GBY~?GG??GGB?~5BP!?!JGJ?7YG?~!5GGGB~        .                . .                    
.::.!GGGGGY~5GY~J:5G7!!JGGG5^!?G?7!7GP7JGGP!5GP!??GJ~??GGGG?!5P57??GP!!?GGGGJ~!5G7?!YG7!7P5~!~PP~?~YP?7?5G?^~YGGGG!.::::::... ..           ..                      
.....^~~~^:. .^!7777JJJJ?7~.  .~?5PPPPGGGGGPPGGPPGPGGPPPGGGGGGPGGPGGPGGGGGGGGGGGGGGGGBGGGGGGGBBGGGGGGGGBGGGGGGGGGGGGGGGGPPGGPGPGGPGGGGGPPGGPPPGGGGGGPPPPGPPPP5JY5Y??JJ?7!^.  :~~~~^^^^.             
:!YPPPPGGBBGPY7YGBBBBBBBBBBBG5!~5GBGBBBBGGGGGGGGGGBGGGGGBGGGGGGPGGGGGGPPPPGGGGGGYYYYYYYYGGGGGPYYYPGBGGGP5PPPGGGPPPPPGGGP5PGGGGGGBGGPGGGGGGGGGGGGGGGGGGBGBBBBBBGGBBBBBBBBBBBGY~JPGBBGGGGGPY!:          
:?PBGGBBGBGGGBGGGGGGG5PGP55YPBGGGGGGBGY7!7YPBGGGP?~~J7~~~~JGBG5J~^^JGGGJ^^^:?BP57^::......PGGY7^:.::!JPGG7:::^PGG!:^^:5B5^:^^?GGBPY!~^^~7YGGGGGPYGGGGBG5?!!777??PBG5Y5GG5Y5GGGGGGGBGGGBGGBGGBP7.        
GGGGB5??5J7~~75BGGG5!::7~:::^?PGGGGGY~::.:.~JGG7:::::::::::^JG!::::.5GG?:::.7B?::::~?????JG5~:::^!:::.^YB!::::PGG!:::.5B7.:.~PGGJ^::::::::~5GGGGGGGGP?~:::......YY7:::7~:::!5GGGGGJ!~J?!!75GGGB5^       
GGGP?^:::::::::75G7:::::::::::^JGGP!::::~::::^55~::::~P57:::.7G?:::.5BB?:::.7B7:::.JBBBBBBG~::::5B5~.:^7B7::::PGB!::::5G7^^?GGG?:::.!PY^::.:YGGGGGGG5::::^?JJ??75?:::::::::::!5BJ^:::::::::?GGGGG7      
GGG7::::::^^:::.^P5^::::75~::::.5G!:::^YG?:::.!GJ:::.~BGG^::.~BY::::?557:::.7B7:::.75YYY5GP^:::!GGBP?YGGGY:::.7GY^::.~GGGGGGPGG7.::.!GBP!~!5GGGGGGGG5:::.!GBBBBBGB7::::^?7:::.^GY^:::::::::.~PGGGG7     
GGGG!::::!PP?:::.?B5:::.JBY::::.5G^::.?BBY::::~GY:::.~BBP^::.!B5:::::::::::.7B7::::::::.7BP^::.!GGGGBGGGGGY^:::^::::75GGGGGPPGGP!::::^!JPGBGGGGPPGGG5::::!PGGGGGGG?:::.7BB!::::PBY::::~5J^:::^5GGGG:    
GGGPJ:::.7BGG~::.7B5::::JP!::::JGG^::.?GG5::::~BY:::.~Y?~:::~5B5^:::!??!:::.7B7::::!JJJJ5GP^:::!GGGGGGGGGGGP?:::::!5BGGG57!JGGGGG5?~::.:^!YGGGGGGGGG5:::::^^~~!5PGJ:::.7BG!::::PB5:^^.!BBY:::.7BGGB^    
GG5PY:::.7GGG!::.7B5::::^^::::JBGG^::.?BPY::::~BY:::.::...^YGGGY::::YBB?:::.7B7:::.JBBBBBGG^:::^PBG?~~?PGGGGP::::.PBGG5?: :YGGGGBGPPPJ~::::~PGGGGGGG5::::::::..5GGJ:::.7BG!::::PB5:::.!GG5:::.7BGGG^    
GGGG5:::.7BBY:::.YB5:::::::::::?GG^::.?BG5::::~BY:::.^!!7JPGGGGY::::YGG?:::.7B7:::.?PPPPP5GJ:::.!J!::..7GGGGP::::.5GGGY   ?BGGGY7^:^5BG!::: ?BGGGGGG5::::~YYYJJGGGJ:::.7BG!::::PB5:::.!GGP^::.7BGGG^    
GGGG5:::.7Y7::::7GG5::::!J?::::.JG^:::7BBJ:::.!BY:::.~GGGGGGGGGY:::.YGG?:::.7B7.:::::::::.JBP7^:...::~JGGGGGP::::.5GGGY.  7BGGG5~::::??^::.:YGGGGGGG5::::!GBBBBGGGJ:::.7BG!::::PB5:::.!GGP^::.7BGGG^    
GGGG5:::.7~.::^YGGG5:::.JBG!:::.7G~::::7J^:::~5BY:::.~GGGGPGGGGY::::YGGJ^~!~JBY77777777???5GGGPJ777JPGBGBGGGP?7777PGGBY.  .?GGGGGJ~::..::^75GGGGGGGG5::::!PGGGGGGGJ:^^:7BG!::::PB5:^:.!GGP^::.?BGGG^    
GGGG5:::.7!:^!PGGGG5:::.JGB!:::.?BP!::::::.^JGGGY::^^!GGGG5GGGGG5555GGGGGGGGGGGBBBBBBBBBBBBGBBBBBBBBBBGPJ5BGGBBBBBGGBG!     ~5GGGGG5J!!7YPGGGBP?PGGPY:::::^~~~?PGGJ:^^:7GG7:^^^PGP^^^:~GGG~:^:!PGGG^    
GGGG5:::.7PPGGGGGGG5:::.JGG?:::.7GGGY!^::^7PBGGGP5PPGGGGBG~?PGBBBBBBBGGGGGGGGGPPPPPP55555YYY??Y5PPP5Y?~. .7Y5PPPPPP5J~       .!5GBBBBGGBBBBGP?: 5GYJJ!~~^:::::.~GB7:^^^!PB?:^^^PGP~^^:?BG5^^^:7GGGG^    
GGGG5:::.7BGGGGGGGG5:::.JGGY::^^?GGGGGP55GBGGBGBBBBBBBGGY~  :!JJJJ?JJ!~~~^^^^:::::.......      .....     .  ....:::.            ^7YPGGGGP5J~.   7Y5BBBGGP55Y!^!JGB7:::^YGG?:^^^PG5^^^:75?^^^^:?GGGG:    
GGGG5:::.7GGGGGGGGG5:^~!YGP555PGGGGBGBBBBBBG57!?YYJ?7!^:                                                ..                         .:^^^:.    ...:?YPGGGBBPBGPBBGGP5YJ?YGG?:::~GG5:^^^^::^^^^:7GGG5.    
GGGG5:^:.7GGGGPGGGGG5PGGPPGGBBBBGGPJ~77?777^:.                 ..                  .                   .                 ..                  ..     .:^^~7J?JYY55PPBBBBBGG5?!!YGG5::::^::::::^YGBP:     
GGGG5:^~~YGGGBJ7PBBBBGPPP5YJJ?!~~^.                                                                 ..                                      .     ..      .  ....::!??Y55GGBBBBGGP7!!7~~~!!!JPGB5^      
GGGGG5PGGGGGBP^ :!JYY?!~^:                                                                                                                          .............      ..^^~7?YPGGBBBBGPGGGGBG57.       
7PGBBBBBGGPY7:                                                                                                                                                                 :^^~~!7YPGG5?!^. .       
.^7JJ?7~:.                                                                                                                                                                           ..::..            
                                                                                                                                                               
                                                                                                                                                               
                                                                                                                                                               `
}