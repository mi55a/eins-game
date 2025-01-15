
// This is an array from running a Python script on images folder


const cardImages = [
    {name:"6_blue.png", src: "images/6_blue.png" },
    {name:"7_blue.png", src: "images/7_blue.png" },
    {name:"2_green.png", src: "images/2_green.png" },
    {name:"4_red.png", src: "images/4_red.png" },
    {name:"10_green.png", src: "images/10_green.png" },
    {name:"7_yellow.png", src: "images/7_yellow.png" },
    {name:"11_yellow.png", src: "images/11_yellow.png" },
    {name:"4_green.png", src: "images/4_green.png" },
    {name:"2_yellow.png", src: "images/2_yellow.png" },
    {name:"1_black.png", src: "images/1_black.png" },
    {name:"9_green.png", src: "images/9_green.png" },
    {name:"5_red.png", src: "images/5_red.png" },
    {name:"8_yellow.png", src: "images/8_yellow.png" },
    {name:"3_green.png", src: "images/3_green.png" },
    {name:"11_green.png", src: "images/11_green.png" },
    {name:"5_yellow.png", src: "images/5_yellow.png" },
    {name:"7_red.png", src: "images/7_red.png" },
    {name:"0_yellow.png", src: "images/0_yellow.png" },
    {name:"5_green.png", src: "images/5_green.png" },
    {name:"6_red.png", src: "images/6_red.png" },
    {name:"1_blue.png", src: "images/1_blue.png" },
    {name:"0_blue.png", src: "images/0_blue.png" },
    {name:"8_green.png", src: "images/8_green.png" },
    {name:"12_blue.png", src: "images/12_blue.png" },
    {name:"10_yellow.png", src: "images/10_yellow.png" },
    {name:"0_green.png", src: "images/0_green.png" },
    {name:"3_yellow.png", src: "images/3_yellow.png" },
    {name:"3_red.png", src: "images/3_red.png" },
    {name:"10_red.png", src: "images/10_red.png" },
    {name:"12_green.png", src: "images/12_green.png" },
    {name:"2_red.png", src: "images/2_red.png" },
    {name:"11_red.png", src: "images/11_red.png" },
    {name:"6_green.png", src: "images/6_green.png" },
    {name:"6_yellow.png", src: "images/6_yellow.png" },
    {name:"5_blue.png", src: "images/5_blue.png" },
    {name:"4_blue.png", src: "images/4_blue.png" },
    {name:"1_green.png", src: "images/1_green.png" },
    {name:"0_red.png", src: "images/0_red.png" },
    {name:"1_yellow.png", src: "images/1_yellow.png" },
    {name:"8_blue.png", src: "images/8_blue.png" },
    {name:"9_blue.png", src: "images/9_blue.png" },
    {name:"12_yellow.png", src: "images/12_yellow.png" },
    {name:"10_blue.png", src: "images/10_blue.png" },
    {name:"11_blue.png", src: "images/11_blue.png" },
    {name:"9_red.png", src: "images/9_red.png" },
    {name:"2_blue.png", src: "images/2_blue.png" },
    {name:"3_blue.png", src: "images/3_blue.png" },
    {name:"8_red.png", src: "images/8_red.png" },
    {name:"9_yellow.png", src: "images/9_yellow.png" },
    {name:"7_green.png", src: "images/7_green.png" },
    {name:"12_red.png", src: "images/12_red.png" },
    {name:"4_yellow.png", src: "images/4_yellow.png" },
    {name:"1_red.png", src: "images/1_red.png" },
    {name:"2_black.png", src: "images/2_black.png" },
];

function randomCard(elementID) {
    // const randomIndex = Math.floor(Math.random() * cardImages.length);
    // const imagePath = cardImages[randomIndex].src;
    const element = document.getElementById(elementID);

    if(element.tagName === 'IMG') {
        const randomIndex = Math.floor(Math.random() * cardImages.length);
        const imagePath = cardImages[randomIndex].src;
        element.src = imagePath;
    } else if (element.tagName === 'DIV') {
        const images = element.getElementsByTagName('img');
        for(let i = 0;i < images.length;i++) {
            const randomIndex = Math.floor(Math.random() * cardImages.length);
            const imagePath = cardImages[randomIndex].src;
            images[i].src = imagePath;
        }
    }
    // console.log("It's working!!");

    // for(let i = 0;i < images.length;i++) {
    //     const randomIndex = Math.floor(Math.random() * cardImages.length);
    //     const imagePath = cardImages[randomIndex].src;
    //     images[i].src = imagePath;
    // }

}
document.getElementById('draw-card').addEventListener('click', function() {
    randomCard("card_Image");
});

document.getElementById('generate-cards').addEventListener('click', function() {
    randomCard("four-images");
});

const backButton = document.getElementById('back-button');

backButton.addEventListener('click', function() {
    history.back();
});




