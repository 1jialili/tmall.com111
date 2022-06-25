import $ from './jquery.esm.js';
import Swiper from '../swiper/swiper-bundle.esm.browser.min.js';
var swiper = new Swiper ('.swiper', {
  autoplay :true,
  loop: true, // 循环模式选项  
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },     
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },      
})

//请求数据库数据，数据页面渲染
$.ajax({
  type: "get",
  url: "../interface/getitems.php",
  dataType: "json"
}).then(res => {
  let template = '';
  res.forEach(el => {
    let pic = JSON.parse(el.picture);
    template += `<div class="tianmao-gongyong-message tianmao-supermarket-message">
    <a href="./details.html?id=${el.id}">    
        <img src="./${pic[0].src}" alt="${pic[0].alt}">
      <p class="title">${el.title}</p>
      <span class="price">￥${el.price}</span>
    </a>
  </div>`;
  console.log(template);
  });
  $('.tianmao-supermarket-content').html(template);
}).catch(xhr => {
  console.log(xhr.status);
});
         