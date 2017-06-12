/**
 * Created by Administrator on 2017/6/6.
 */
$(function () {
  var pageNum = 1;
  var pageHtml;
  function renderCallback(callback) {
    $.ajax({
      url: "http://127.0.0.1:9090/api/getmoneyctrl",
      type: "get",
      data:{pageid : pageNum-1 },
      dataType:"json",
      success:function (data) {
        callback && callback(data);
      }
    })
  }
//下拉框选中
  $('.pageCount').on('change', function () {
    var $options = $(this).children();
    $options.each(function (idx, val) {
      if ($(val).prop('selected') === true) {
        pageNum = idx + 1;

        renderCallback(function (data) {
          $('.productList > div').empty();
          var strTpl = template('tpl', data);
          $('.productList > div').append(strTpl);
        })
      }
    })
  });
function pageRender(pageNum,$options) {
  for(var i = 0; i < $options; i++){
    pageHtml += "<option>"+(pageNum+i)+"/"+$options+"</option>";
  }
  $(".pageCount").append(pageHtml);
}
  renderNextPrev();
  function renderNextPrev() {
    renderCallback(function (data) {
      var strTpl = template("tpl",data);
      $(".productList > div").append(strTpl);
      //跳转到下一层页面
      $('.productListContent').on('click', function () {
        var attId = $(this).attr("productid");
        localStorage.setItem("productId", JSON.stringify(attId));
        window.location.href = "moneyproduct.html";
      })

      var $options = Math.ceil(data.totalCount / data.pagesize);
      pageRender(pageNum,$options);



      //下一页
      $('.next').on('click', function () {
        if (pageNum >= $options) {
          pageNum = $options;
          return;
        }
        pageNum++;
        $('.pageCount').children().eq(pageNum - 1).prop("selected", true).siblings().prop("selected", false);
        renderCallback(function (data) {
          $('.productList > div').empty();
          var strTpl = template('tpl', data);
          $('.productList > div').append(strTpl);
        })
      });

      //上一页
      $('.prev').on('click', function () {
        if (pageNum <= 1) {
          pageNum = 1;
          return;
        }
        pageNum--;
        $('.pageCount').children().eq(pageNum - 1).prop("selected", true).siblings().prop("selected", false);
        renderCallback(function (data) {

          $('.productList > div').empty();
          var strTpl = template('tpl', data);
          $('.productList > div').append(strTpl);
        })
      });
    })
  }

  Route.scrollTop();
})