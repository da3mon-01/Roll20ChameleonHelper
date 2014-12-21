//Character Name of the Chameleon Class PC
var characterName = "Rev Duskhand"

//Initializing variables
var defaultbonus = "0";
var bonusToAttackAttr = "BonusToAttack";
var bonusToDamageAttr = "BonusToDamage";
var currentFocusAttr = "CurrentFocus";
var chameleonBonusAttr = "ChameleonBonus";
var fortBonusAttr = "FortBonus";
var refBonusAttr = "RefBonus";
var willBonusAttr = "WillBonus";
var arrayofControllers = "me";
var ChameleonChar = null;

//Converts the Focus Number to Text
function currentFocusToText(focusNum){
//CurrentFocus
//0-Arcance
//1-Combat
//2-Divine
//3-Stealth
//4-Wild
    var focustext;
    if(focusNum==0)
        focustext="Arcane";
    if(focusNum==1)
        focustext="Combat";
    if(focusNum==2)
        focustext="Divine";
    if(focusNum==3)
        focustext="Stealth";
    if(focusNum==4)
        focustext="Wild";
        
    return focustext;
}

//Finds an attribute by name
function findAttribute(name){
    var attrs = findObjs({
                _type: "attribute",
		        _name: name,
                _characterid: ChameleonChar.id
	});
    
    return attrs[0];
}

//Gets the Current Chameleon Bonus to add 
function getChameleonBonus(){
    return getAttrByName(ChameleonChar.id,chameleonBonusAttr);
}

//Sets the value of Attribute attributename
function setAttrByName (attributename, value){
    var attribute = findAttribute(attributename);
    attribute.set("current", value);
}

//Gets current Focus from currentFocusAttr attribute
function getCurrentFocus(){
    var currentfocus = getAttrByName(ChameleonChar.id,currentFocusAttr);
    return currentfocus;
}

//Saves current Focus in Attribute
function setCurrentFocus(focus){
    setAttrByName(currentFocusAttr, focus);
}

//Disables the old focus/stats during change
function clearOldFocus(status){
    if(status == 0){
        log("Deactivating "+ currentFocusToText(status));
        setAttrByName(willBonusAttr, defaultbonus);
    }
    if(status == 1){
        log("Deactivating "+ currentFocusToText(status));
        setAttrByName(bonusToAttackAttr, defaultbonus);
        setAttrByName(bonusToDamageAttr, defaultbonus);
    }
    if(status == 2){
        log("Deactivating "+ currentFocusToText(status));
        setAttrByName(fortBonusAttr, defaultbonus);
        setAttrByName(willBonusAttr, defaultbonus);
    }
    if(status == 3){
        log("Deactivating "+ currentFocusToText(status));
        setAttrByName(refBonusAttr, defaultbonus);
    }
    if(status == 4){
        log("Deactivating "+ currentFocusToText(status));
        setAttrByName(fortBonusAttr, defaultbonus);
    }
    
}

//Sets new focus/stats during change
function setNewFocus(status){
    if(status == 0){
        log("Activating "+currentFocusToText(status));
        setAttrByName(willBonusAttr, getChameleonBonus());
    }
    if(status == 1){
        log("Activating "+currentFocusToText(status));
        setAttrByName(bonusToAttackAttr, getChameleonBonus());
        setAttrByName(bonusToDamageAttr, getChameleonBonus());
    }
    if(status == 2){
        log("Activating "+currentFocusToText(status));
        setAttrByName(fortBonusAttr, getChameleonBonus());
        setAttrByName(willBonusAttr, getChameleonBonus());
    }
    if(status == 3){
        log("Activating "+currentFocusToText(status));
        setAttrByName(refBonusAttr, getChameleonBonus());
    }
    if(status == 4){
        log("Activating "+currentFocusToText(status));
        setAttrByName(fortBonusAttr, getChameleonBonus());
    }
    
}

//Lists skill bonuses realated to focuses
function listBonuses(focus){
    sendChat("character|"+ChameleonChar.id,"<-RevChameleon Script->");
    sendChat("character|"+ChameleonChar.id, "You have +"+getChameleonBonus()+" to: ");
    if(focus==0){
        sendChat("character|"+ChameleonChar.id, "competence bonus to Knowledge(Arcana) and Spellcraft.");
        sendChat("character|"+ChameleonChar.id, "Will Saves.");
    }
    if(focus==1){
        sendChat("character|"+ChameleonChar.id, "competence bonus attack and damage.");
        sendChat("character|"+ChameleonChar.id, "Fort Saves.");
    }
    if(focus==2){
        sendChat("character|"+ChameleonChar.id, "competence bonus to Knowledge(Religion).");
        sendChat("character|"+ChameleonChar.id, "Fort and Will Saves.");
    }
    if(focus==3){
        sendChat("character|"+ChameleonChar.id, "competence bonus to Disable Device, Hide, Move Silently, Open Lock, and Search.");
        sendChat("character|"+ChameleonChar.id, "Ref Saves.");
        sendChat("character|"+ChameleonChar.id, "You also have trapfinding, uncanny dodge.");
    }
    if(focus==4){
        sendChat("character|"+ChameleonChar.id, "competence bonus to Climb, Handle Animal, Jump, Knowledge (nature), and Survival check");
        sendChat("character|"+ChameleonChar.id, "Fort and Will Saves.");
        sendChat("character|"+ChameleonChar.id, "You also have wild empathy, woodland stride.");
    }
}

//Helper: gets the current lists of Controlled by of PC
function getCurrentControllers(){
    return ChameleonChar.get("controlledby").split(',');
}

//Checks if command was sent by Player who can control this PC
function cmdSentByController(playerid){
    arrayofControllers = getCurrentControllers();
    var sentByPlayerController = false;
    for(i=0;i<arrayofControllers;i++){
        if(playerid==i){
            var sentByPlayerController = true;
        }
    }
    return sentByPlayerController;
}

//Sets up required Attributes
function initCharSheet(character){

    if( getAttrByName(ChameleonChar.id,currentFocusAttr) == undefined){
        sendChat("System",  currentFocusAttr+" Attribute not found, setting.");
        createObj("attribute", {
            name: currentFocusAttr,
            current: 0,
            max: 4,
            characterid: character
        });
    }
    
    if(getAttrByName(ChameleonChar.id,bonusToAttackAttr) == undefined){
        sendChat("System",  bonusToAttackAttr+" Attribute not found, setting.");
        createObj("attribute", {
            name: bonusToAttackAttr,
            current: 0,
            max: 4,
            characterid: character
        });
    }
    
    if(getAttrByName(ChameleonChar.id,bonusToDamageAttr) == undefined){
        sendChat("System",  bonusToDamageAttr+" Attribute not found, setting.");
        createObj("attribute", {
            name: bonusToDamageAttr,
            current: 0,
            max: 4,
            characterid: character
        });
    }
    
    if(getAttrByName(ChameleonChar.id,chameleonBonusAttr) == undefined){
        sendChat("System",  chameleonBonusAttr+" Attribute not found, setting.");
        createObj("attribute", {
            name: chameleonBonusAttr,
            current: 2,
            max: 4,
            characterid: character
        });
    }
    
    if(getAttrByName(ChameleonChar.id,fortBonusAttr) == undefined){
        sendChat("System",  fortBonusAttr+" Attribute not found, setting.");
        createObj("attribute", {
            name: fortBonusAttr,
            current: 0,
            max: 4,
            characterid: character
        });
    }
    
    if(getAttrByName(ChameleonChar.id,refBonusAttr) == undefined){
        sendChat("System",  refBonusAttr+" Attribute not found, setting.");
        createObj("attribute", {
            name: refBonusAttr,
            current: 0,
            max: 4,
            characterid: character
        });
    }
    
    if(getAttrByName(ChameleonChar.id,willBonusAttr) == undefined){
        sendChat("System",  willBonusAttr+" Attribute not found, setting.");
        createObj("attribute", {
            name: willBonusAttr,
            current: 0,
            max: 4,
            characterid: character
        });
    }
    
}

//Chat Command Console
on("chat:message", function(msg){
    
    
    if(cmdSentByController(msg.playerid)=="false"){
        sendChat("System", "You are not in Control of this Character!");
        return;
    }
    
    if(msg.type=="api" && msg.content=="!revstatus"){
        sendChat("character|"+ChameleonChar.id, "Current Focus: "+currentFocusToText(getCurrentFocus()));
    } else if(msg.type=="api" && msg.content=="!revarcane"){
        sendChat("character|"+ChameleonChar.id,"<-RevChameleon Script->");
        sendChat("character|"+ChameleonChar.id, "Changing Focus to: "+currentFocusToText(0));
        clearOldFocus(getCurrentFocus());
        setNewFocus(0);
        setCurrentFocus(0);
    } else if(msg.type=="api" && msg.content=="!revcombat"){
        sendChat("character|"+ChameleonChar.id,"<-RevChameleon Script->");
        sendChat("character|"+ChameleonChar.id, "Changing Focus to: "+currentFocusToText(1));
        clearOldFocus(getCurrentFocus());
        setNewFocus(1);
        setCurrentFocus(1);
    } else if(msg.type=="api" && msg.content=="!revdivine"){
        sendChat("character|"+ChameleonChar.id,"<-RevChameleon Script->");
        sendChat("character|"+ChameleonChar.id, "Changing Focus to: "+currentFocusToText(2));
        clearOldFocus(getCurrentFocus());
        setNewFocus(2);
        setCurrentFocus(2);
    } else if(msg.type=="api" && msg.content=="!revstealth"){
        sendChat("character|"+ChameleonChar.id,"<-RevChameleon Script->");
        sendChat("character|"+ChameleonChar.id, "Changing Focus to: "+currentFocusToText(2));
        clearOldFocus(getCurrentFocus());
        setNewFocus(3);
        setCurrentFocus(3);
    } else if(msg.type=="api" && msg.content=="!revwild"){
        sendChat("character|"+ChameleonChar.id,"<-RevChameleon Script->");
        sendChat("character|"+ChameleonChar.id, "Changing Focus to: "+currentFocusToText(3));
        clearOldFocus(getCurrentFocus());
        setNewFocus(4);
        setCurrentFocus(4);
    } else if(msg.type=="api" && msg.content=="!revbonus"){
        listBonuses(getCurrentFocus());
    } else if(msg.type=="api" && msg.content=="!revhelp"){
        sendChat("character|"+ChameleonChar.id,"<-RevChameleon Script->");
        sendChat("character|"+ChameleonChar.id,"!revstatus -> Get current Status.");
        sendChat("character|"+ChameleonChar.id,"!revarcane -> Set Arcane Focus.");
        sendChat("character|"+ChameleonChar.id,"!revcombat -> Set Combat Focus.");
        sendChat("character|"+ChameleonChar.id,"!revdivine -> Set Divine Focus.");
        sendChat("character|"+ChameleonChar.id,"!revstealth -> Set Stealh Focus.");
        sendChat("character|"+ChameleonChar.id,"!revwild -> Set Wild Focus.");
        sendChat("character|"+ChameleonChar.id,"!revbonus -> List all bonuses related to a focus.");
    } else if(msg.type=="api"){
        sendChat("character|"+ChameleonChar.id,"<-RevChameleon Script->");
        sendChat("character|"+ChameleonChar.id,"Command not recognized. Use !revhelp to list all commands.");
    }
});

//Init Part
on("ready", function(){
    sendChat("System","<-RevChameleon Script->");
    sendChat("System", "REV-Chameleon Script Loaded.");
    
	//Get Character
	var tmpChar = findObjs({
		_type: "character",
		_name: characterName
	});
	
    ChameleonChar = tmpChar[0];
    
	if(ChameleonChar == null){
		log("Rev Not Found!!");
	}
    
    log("ChameleonChar: "+ ChameleonChar.id);
	
	//Set Up Attributes if Needed
    initCharSheet(ChameleonChar.id);
    
	//Init the Controllers List
    arrayofControllers = getCurrentControllers();
    log("Current Controllers: "+arrayofControllers.length);
    
	//Load the Initial Focus
	currentfocus = getAttrByName(ChameleonChar.id,currentFocusAttr);
    sendChat("character|"+ChameleonChar.id,"<-RevChameleon Script->");
	sendChat("character|"+ChameleonChar.id, "Current Focus: "+currentFocusToText(getCurrentFocus()));

});