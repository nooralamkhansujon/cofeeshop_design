//hide preloader


eventListener();
function eventListener(){
   const ui = new UI();
   window.addEventListener('load',function(){
   ui.hidePreloader();
   });

   document.querySelector('.navBtn').addEventListener('click',function(){
     ui.showNav();
   });

   //control the video
   document.querySelector('.video_switch').addEventListener('click',function(){
      ui.videoControls();
   });

   //submit the form
   document.querySelector('.drink-form').addEventListener('submit',function(event){
     event.preventDefault();
     const name     = document.querySelector('.input-name').value
     const lastname = document.querySelector('.input-lastname').value
     const email    = document.querySelector('.input-email').value

     let value =ui.checkEmpty(name,lastname,email);
     if(value){
         let customer = new Customer(name,lastname,email);
         console.log(customer);
         ui.addCustomer(customer);
         ui.showfeedback('You success inserted Data','success');
         ui.clearfields();
    }
    else{
      ui.showfeedback('some form values empty','error');
    }

   });
   //display model
   const links = document.querySelectorAll('.work-item_icon');

   links.forEach(function(item){
       item.addEventListener('click',function(event){
           ui.showModal(event)
       })
   });

   //hide Modal
   document.querySelector('.work-modal_close').addEventListener('click',function(){
       ui.closeModal()
   });

}

//constructor function
function UI(){
}
UI.prototype.hidePreloader = function(){
    document.querySelector('.preloader').style.display="none";
}
UI.prototype.showNav = function(){
     document.querySelector('nav').classList.toggle('nav_show');
}
//control the video

UI.prototype.videoControls = function(){
    let btn =document.querySelector('.video_switch-btn');
    if(!btn.classList.contains('btnSlide')){
        btn.classList.add('btnSlide');
        document.querySelector('.video_item').pause()
    }
    else{
       btn.classList.remove('btnSlide');
       document.querySelector('.video_item').play()
    }
}

// check for empty value
UI.prototype.checkEmpty =function(name,lastname,email){
     let result;
     if(name === '' || lastname === ''|| email === "" ){
        result = false;
     }
     else {
       result = true;
     }
     return result;
}

//return message success or error

UI.prototype.showfeedback = function(text,type){
   if(type === 'success'){
     const feedback = document.querySelector('.drink-form_feedback');
     feedback.classList.add('success');
     feedback.innerText=text;
     this.removeAlert('success');
   }
   else if(type === 'error'){
      let feedback = document.querySelector('.drink-form_feedback');
      feedback.classList.add('error');
      feedback.innerText=text;
      this.removeAlert('error');
   }
}

//remove alert
UI.prototype.removeAlert = function(type){

   setTimeout(function(){
     document.querySelector('.drink-form_feedback').classList.remove(type);
   },3000)
}
// add customer
UI.prototype.addCustomer = function(customer){
    const images =[1,2,3,4,5];
    let random   = Math.floor(Math.random()*images.length);
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML ='<img src="img/'+images[random]+'.jpg" alt="person"class="person_thumbnail"><h4 class="person_name">'+customer.name+'</h4> <h4 class="person_last-name">'+customer.lastname+'</h4>'
    const drink_card_list = document.querySelector('.drink-card_list');
    drink_card_list.appendChild(div);
}
// clear fields
UI.prototype.clearfields = function () {
  document.querySelector('.input-name').value     = "";
  document.querySelector('.input-lastname').value = "";
  document.querySelector('.input-email').value    = "";
};

//Show modal
UI.prototype.showModal = function(event){
  event.preventDefault();
  let targetEle =event.target.parentElement.parentElement;
  if(targetEle.classList.contains('work-item_icon')){
    let id = targetEle.dataset.id
    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal_item');
    modal.classList.add('work-modal_show');
    let result =modalItem.style.backgroundImage = 'url(img/work-'+id+'.jpeg)';

  }
}
//hide modal
UI.prototype.closeModal = function(){
  let modal = document.querySelector('.work-modal');
  modal.classList.remove('work-modal_show');
}



//Customer constructor
function Customer(name,lastname,email){
  this.name     = name;
  this.lastname = lastname;
  this.email    = email
}
