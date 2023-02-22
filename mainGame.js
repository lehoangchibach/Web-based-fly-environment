let health = 10
let attack = 2
let defense = 2
let stage = 1;


const getCharacterStat = () => {
    // console.log("getCharacterStat");
    str = "Health: " + health + ", Attack: " + attack + ", Defense: " + defense
    let p_tag = document.createElement("p").appendChild(document.createTextNode(str))
    document.getElementsByClassName("adventurer").appendChild = p_tag
}
