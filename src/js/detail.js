import cookie from './cookie.js';
let id = location.search.split('=')[1];
// console.log(id);
$.ajax({
  type: "get",
  url: "../interface/getdetailsitem.php",
  data: { id },
  dataType: "json"
}).then(res => {
  let pic = JSON.parse(res.picture);
  // console.log(pic);
// console.log(pic[1].src);//有输出，确定数据请求成功
  let template = `
  <div class="magnifier" id="magnifier1">
      <div class="magnifier-container">
        <div class="images-cover"><img src="./${pic[0].src}"></div>
        <!--当前图片显示容器-->
        <div class="move-view"></div>
        <!--跟随鼠标移动的盒子-->
      </div>
      <div class="magnifier-assembly">
        <!--按钮组-->
        <div class="magnifier-line">
          <ul class="clearfix animation03">
            <li class="">
              <div class="small-img">
                <img src="./${pic[0].src}">
              </div>
            </li>
            <li class="">
              <div class="small-img">
                <img src="./${pic[2].src}">
              </div>
            </li>
            <li class="">
              <div class="small-img">
                <img src="${pic[3].src}">
              </div>
            </li>
            <li class="">
              <div class="small-img">
                <img src="${pic[4].src}">
              </div>
            </li>
            <li class="active">
              <div class="small-img">
                <img src="${pic[5].src}">
              </div>
            </li>
          </ul>
        </div>
        <!--缩略图-->
      </div>
      <div class="magnifier-view"><img src="${pic[0].src}"></div>
      <!--经过放大的图片显示容器-->
    </div>
    <div class="collect">
      <a href="#" class="iconfont icon-shoucang">收藏商品</a>
      <a href="#">举报</a>
    </div>
  `;
// console.log($('.banner-left'));//注意此处类名只选一个
  $('.banner-left').html(template);
  let template1 = `<h1>${res.title}</h1>
  <p>棉韧立体美压花 亲肤无刺激 立体美压花</p>`;
  $('.detail-hd').html(template1);
  let template2 = `<em>￥</em>
  <span>${res.price}</span>
  <span class="promo-price">超市推荐</span>`;
  $('#price-text').html(template2);

  let template3 = `
  <img src="./${pic[6].src}" alt="">
    <img src="./${pic[7].src}" alt="">
    <img src="./${pic[8].src}" alt="">
    <img src="./${pic[9].src}" alt="">
    <img src="./${pic[10].src}" alt="">
    <img src="./${pic[11].src}" alt="">
    <img src="./${pic[12].src}" alt="">
  `;
  $('.main-picture').html(template3);
//渲染会产生异步问题，放大镜无法实现。所以js写此处，可解决异步带来的问题，不写在页面里面
  $(function() {  
    var magnifierConfig = {
      magnifier : "#magnifier1",//最外层的大容器
      width : 420,//承载容器宽
      height : 420,//承载容器高
      zoom : 2//缩放比例
    }; 
    var _magnifier = magnifier(magnifierConfig);
  });


  function addItem(id,num){
    let product = {id,num};
    let shop = cookie.get('shop');
    console.log(shop);
    if(shop){
      shop = JSON.parse(shop);
      if (shop.some(el=>el.id == id)){
        let index = shop.findIndex(elm=>elm.id == id);
        let count = parseInt(shop[index].num);
        count += parseInt(num);
        shop[index].num = count;
      } else {
        shop.push(product);
      }
    } else {
      shop = [];
      shop.push(product);
    }
    cookie.set('shop', JSON.stringify(shop));  // 将数组转换成JSON字符串存入cookie
  
  }

  $('#additem').on('click', function () {
    addItem(res.id, $('#num').val());
  });



}).catch(xhr => {
  console.log(xhr.status);
});

$('.add').on('click',function(){
  let num = +$('#num').val();
  num=num+1;
  $('#num').val(`${num}`);
  console.log(num);
  // let num = parseInt($('#num').val());
  // $('#num').val(`${num+=1}`);
  // console.log(num);
});
$('.sub').on('click',function(){
  let num = +$('#num').val();
  num=num-1;
  $('#num').val(`${num}`);
  // console.log(num);
  if(num < 1){
    $('#num').val(0)
  }
});

