/**
 * Created by Administrator on 2017/6/5.
 */
$(function () {


  var ref = location.href;
  //把获取到的地址栏的参数截取出来
  function query(url) {
    var obj = {};
    var str = url.split('?')[1]
    if (!str) {
      return {}
    }
    var arr = str.split('&');
    arr.forEach(function (value, index) {
      var arrObj = value.split("=");
      var key = arrObj[0];
      var value = arrObj[1];
      obj[key] = value;
    })
    return obj;
  }

  var queryObj = query(ref);
  console.log(queryObj.categoryId);
  console.log(queryObj.pageid);
  var strTxt = decodeURI(queryObj.category);
  $('.categoryName').html(strTxt);


  //渲染界面
  function renderCurrent(callback) {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getproductlist",
      data: {categoryid: queryObj.categoryId, pageid: queryObj.pageid},
      dataType: "json",
      success: function (data) {
        callback(data);
      }
    })
  }


  //循环动态遍历Select option的值
  function renderPages(pageNum, pageCount) {
    for (var i = 0; i < pageCount; i++) {
      pageHtml += "<option value=" + (pageNum + i) + "> " + (pageNum + i) + "/" + pageCount + "</option>";
    }
    $('.pageCount').html(pageHtml);
  }

  //页码
  var pageNum = 1;
  var pageHtml;
  //下拉框选中
  $('.pageCount').on('change', function () {
    var $options = $(this).children();
    $options.each(function (idx, val) {
      if ($(val).prop('selected') === true) {
        pageNum = idx + 1;

        pageRender(function (data) {
          $('.productList > div').empty();
          var strTpl = template('tpl', data);
          $('.productList > div').append(strTpl);
        })
      }
    })
  });
  function pageRender(callback) {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:9090/api/getproductlist",
      data: {categoryid: queryObj.categoryId, pageid: pageNum},
      dataType: "json",
      success: function (data) {
        callback(data);
      }
    })
  }

  //上下翻页
  renderPrevNext();
  //上下翻页按钮
  function renderPrevNext() {
    renderCurrent(function (data) {
      var strTpl = template('tpl', data);
      $('.productList > div').append(strTpl);
      //跳转到下一层页面
      $('.productListContent').on('click', function () {
        var attId = $(this).attr("productid");
        localStorage.setItem("productid", JSON.stringify(attId));
        localStorage.setItem("strTxt", JSON.stringify(strTxt));
        window.location.href = "bijia.html";
      })


      //动态创建option
      var pageCount = Math.ceil(data.totalCount / data.pagesize);
      renderPages(pageNum, pageCount);
      $('.pageCount').html(pageHtml);

      //下一页
      $('.next').on('click', function () {

        if (pageNum >= pageCount) {
          pageNum = pageCount;
          return;
        }
        pageNum++;
        console.log(pageNum);
        $('.pageCount').children().eq(pageNum - 1).prop("selected", true).siblings().prop("selected", false);
        pageRender(function (data) {
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
        pageRender(function (data) {
          $('.productList > div').empty();
          var strTpl = template('tpl', data);
          $('.productList > div').append(strTpl);
        })
      });


    })
  }



  Route.scrollTop();
})
