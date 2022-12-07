const url = 'data.json'

ReqData();


function ReqData(){

    fetch(url)
        .then(res=>res.json())
        .then(data=> {
            add(data)

        })
        .catch((error) =>{
            console.log(error)
        })

}

function add(data){
    let body = document.querySelectorAll('.job-container');
    console.log(data);
    body.forEach((ele, ind) =>{
        dataact = data[ind];
        ind+=1;
        ele.querySelector('.job-descr-title h3').textContent = `${dataact.titre}`
        ele.querySelector('.job-info span').textContent = `${dataact.name}`
        ele.querySelector('.local span').textContent = `${dataact.local}`
        ele.querySelector('.content').textContent = `${dataact.description}`

    })




}



// function TextDeal(){
//     let noOfCharac = 50;
//     let contents = document.querySelectorAll(".content");
//     console.log(contents);
//     contents.forEach((content) =>{
//         console.log("test2")
//         if(content.textContent.length <= noOfCharac){
//             console.log("text sup a 50")
//             content.nextElementSibling.style.display = "none";
//         }
//         else{
//             let displayText = content.textContent.slice(0,noOfCharac);
//             let moreText = content.textContent.slice(noOfCharac);
//             console.log("text inf a 50");
//             content.innerHTML = displayText+ `<span class="dots">...</span><span class="hide more">`+{moreText}+`</span>`;
//         }
//     });

// }

function Button(btn){
    let contents = document.querySelectorAll(".content");
    console.log(contents);
    console.log("tets")
    btn.previousElementSibling.classList.toggle("see-more-p")
    btn.textContent == "Read More" ? btn.textContent = "Read Less" : btn.textContent = "Read More";
}



