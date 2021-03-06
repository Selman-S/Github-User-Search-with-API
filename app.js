
const input = document.querySelector('.btn-div input');
const buton = document.querySelector('.btn-div button');
const contain = document.querySelector('.contain');
const followingLink = document.querySelector('.link1');
const following1 = document.querySelector('.following');
window.addEventListener('load',() => {
  input.focus()
})

buton.addEventListener('click',getUser);
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter'){
    getUser()
  }
});

async function getUser() {
  try {
    // const user = 'selman-s';
    const user = input.value;
    const url = await `https://api.github.com/users/${user}?client_id=3b925c08aab40ac38d05&client_secret=31be1b1285e20f238e8777adb3bc11907739a47b`;

    const profileUser = await fetch(url);
    const profile = await profileUser.json();
    if(profile.documentation_url=='https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting'){
      contain.innerHTML=`API rate limit exceeded for you <a href="https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting" target="_blank" >Click to documentation</a>`
    }else{

      writeUser(profile)
    }
    
  }
  catch(err) {
    alert('Error: ' + err.message)
  }
}

function writeUser(profile){
  const {login,avatar_url,html_url,public_repos,followers,following,name}=profile;
  following1.innerHTML =''
  contain.innerHTML = `<div class="main">
    <div class="cart-top">
    <div class="profile-img"><img src="${avatar_url}" alt=""></div>
    </div>
    <div class="cart-bottom">
    <div class="desc">
    <div class="desc-name">
    <p class="login">${login}</p>
    <p class="user-name">${name}</p>
  
    </div>
    <a class="link" href="${html_url}" target="_blank">View Profile</a>
    
    
    <div class="fans">
    <div class="fans-div">
    <p class="quantity">${public_repos}</p>
    <p class="fan">Public Repos</p>
    </div>
    <div class="fans-div">
    <p class="quantity">${followers}</p>
    <p class="fan">Followwers</p>
    </div>
    <div class="fans-div">
    <p class="quantity">${following}</p>
    <p class="fan">Followings</p>
    </div>
    </div>
    </div>
    </div>`  
    input.value ='';
    input.focus();
    getFollow()
  
  
}
  
  
  
  
 
 

 
  
  async function getFollow() {

    const user = document.querySelector('.login').textContent;
   
    
    const url =await `https://api.github.com/users/${user}/following?client_id=3b925c08aab40ac38d05&client_secret=31be1b1285e20f238e8777adb3bc11907739a47b`;
  
   console.log(url);
   
  
      const profileUser = await fetch(url);
      const profile = await profileUser.json();
      
      profile.forEach(async (us)=>{
        const url =await `https://api.github.com/users/${us.login}?client_id=3b925c08aab40ac38d05&client_secret=31be1b1285e20f238e8777adb3bc11907739a47b`;

        const profileUser = await fetch(url);
        const profile = await profileUser.json();
        const {avatar_url,html_url,public_repos,followers,following,name}=profile;
       console.log(profile);
       
        
        following1.innerHTML +=`<div class="contain"><div class="main">
             <div class="cart-top">
             <div class="profile-img"><img src="${avatar_url}" alt=""></div>
             </div>
             <div class="cart-bottom">
             <div class="desc">
             <div class="desc-name">
        
             <p class="user-name">${name}</p>
      
             </div>
             <a class="link" href="${html_url}" target="_blank">View Profile</a>
           
             </div>
        
             <div class="fans">
             <div class="fans-div">
             <p class="quantity">${public_repos}</p>
             <p class="fan">Public Repos</p>
             </div>
             <div class="fans-div">
             <p class="quantity">${followers}</p>
             <p class="fan">Followwers</p>
             </div>
             <div class="fans-div">
             <p class="quantity">${following}</p>
             <p class="fan">Followings</p>
             </div>
             </div>
             </div>
             </div></div>`
             
            });
            
            
            
          }
            