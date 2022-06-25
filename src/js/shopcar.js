// import $ from './jquery.esm.js';
import cookie from "./cookie.js";

let shop = cookie.get("shop");
shop = JSON.parse(shop);
let idList = shop.map((el) => el.id).join();
$.ajax({
  type: "get",
  url: "../interface/shop.php",
  data: { idList },
  dataType: "json",
})
  .then((res) => {
    let template = "";
    res.forEach((el, i) => {
      let pic = JSON.parse(el.picture);
      let current = shop.filter((elm) => elm.id === el.id);
      // console.log(el);

      template += ` 
          <div class="store">
            <div class="che-box">
              <div class="check-box">
                <label  class="selectall-2" for="" flag="false"></label>
              </div>
              </div>店铺：<a href="#">天猫超市</a></div>
            </div>
            <div class="info">
              <div class="info-content clearfix">
                <div class="info-con-left fl">
                  <div class="che-box">
                    <div class="check-box">
                      <label for="" class="s-label"></label>
                    </div>
                  </div>
                  <img src="./${pic[0].src}" alt="">
                  <span><a href="#" class="title">${el.title}</a></span>
                </div>
                <div class="info-con-center">${el.details}</div>
                <div class="info-con-right fr">
                  <li class="price">￥${(+el.price).toFixed(2)}</li>
                  <li> <span class="sub">-</span><input type="number" value="${current[0].num}" min="1"><span class="add">+</span></li>
                  <li><span class="sum-price">￥${(el.price * current[0].num).toFixed(2)}</span><br><span> (0.725kg)</span></li>
                  <li><span>移入收藏夹</span> <br><span class="removeitem" data-id="${el.id}">删除</span></li>
                </div>
              </div>
            </div>
          </div>
   `;
    });
    $(".body-content").html(template);

    $(".body-content .removeitem").on("click", function () {
      let res = shop.filter((el) => el.id != $(this).attr("data-id")); // 筛选被点击的元素
      cookie.set("shop", JSON.stringify(res)); // 剩余内容写回cookie
      location.reload(); // 刷新页面
    });
  })

  .catch((xhr) => {
    console.log(xhr.status);
  });


  $('label[class="selectall"]').on('click', function(){
    if($(this).attr('flag')==='false'){
      $('label').css('background','red');
      $('label').attr('flag','true');
    }else{
      $('label').css('background','transparent');
      $('label').attr('flag','false');
    }   
  });

  $('.body-content').on('click','label',function(){
    if($(this).attr('flag')==='false'){
       $(this).css('background','red');
       $(this).parent().parent().parent().next().children().children().children().children().children().css('background','red');
       $(this).attr('flag','true');
    }else {
      $(this).css('background','transparent');
      $(this).parent().parent().parent().next().children().children().children().children().children().css('background','transparent');
      $('.selectall').css('background','transparent');
      $(this).attr('flag','false');
    }
  });

  $('.body-content').on('click','.s-label',function(){
    if($(this).attr('flag')==='false'){
      console.log($(this).parent().parent().parent().parent().parent().prev().children().children().children());
      $(this).parent().parent().parent().parent().parent().prev().children().children().children().css('background','transparent');
    }
  })

  $('.body-content').on('click','span',function(){
    let num = +$('input').val();
    if($(this).attr('class') ==='add') {
      num++;
      $(this).prev().val(`${num}`);
    };
    if($(this).attr('class') ==='sub') {
      num--;
      $(this).next().val(`${num}`);
      if(num<1){
        $(this).next().val(0)
      }
      // console.log(num);
    } 
// console.log($(this).closest('li').prev().html());
    // $('.sum-price').html(num*15.9) 
    let pri = +($(this).closest('li').prev().html().split('￥')[1]);
    // console.log(pri);
    // let pri = parseInt(($(this).closest('li').prev().html()));
    // console.log($(this).closest('li').next().children('span:first-child'));
    $(this).closest('li').next().children('span:first-child').html('￥'+num*pri) 
  })

  $('.paying').on('click',function(){
    // $('.paying-num').html($('.sum-price').html()) 
    $('.paying-num').html($('.sum-price').html()) 
  })

  