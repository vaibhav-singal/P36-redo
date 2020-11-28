var dog, happyDog, database, foodS, foodStock, dogImage;
var feedPet, addFood, feedTime, lastFed;
var foodObj;

function preload()
{
  dogImage = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
    
})

  foodObj = new Food();

  feedPet = createButton("Feed the dog");
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoodS);
  
  
  dog = createSprite(250,200);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() { 
  
  background(46, 139, 87);
  foodObj.display();

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + "AM", 350,30);
  }

  

  drawSprites();

  fill("red");
  textSize(20);
  text("Food Remaining: "+foodS,100,100);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0) {
    x=0;
  } else{
    x=x-1;
  }



  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoodS(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}