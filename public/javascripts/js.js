$(function()//noinspection JSCheckFunctionSignatures
{


   var jTable=$('#contentTb').jTable();

    jTable.addRow(['测试环境',i]);












    var contentTb={
        $tb:$('#contentTb'),//缓存jq对象
        totalRow:$('#contentTb').find('tbody').find('tr').length,

        addRow:function(eName){
            contentTb.totalRow++;
            var rowHtml='<tr><td>@index</td><td>@eName</td><td><span class="btn compress" data-index="'+(contentTb.totalRow-1)+'">压缩</span><span class="btn editRow">编辑</span> <span class="btn delRowEn" data-index="'+(contentTb.totalRow-1)+'">删除</span></td></tr>';
            rowHtml=rowHtml.replace('@index',contentTb.totalRow).replace('@eName',eName);
            this.append(rowHtml);
        },

        delRow:function(rowIndex){
            contentTb.totalRow--;
            contentTb.$tb.find('tbody').find('tr').eq(rowIndex).remove();
        },


        bindEvent:function(){
            $('body').on('click','.delRowEn',function(){
                contentTb.delRow($(this).data('index'));
            }).on('click','.compress',function(){
                    $('.alert').alert();
                    contentTb.$tb.find('tbody').find('tr').eq($(this).data('index')).addClass('success').find('td').last().html('JS压缩成功 CSS压缩成功');
                });
        },
        init:function(){
            contentTb.bindEvent();
        }
    };

    contentTb.init();


    var settingPage={
        num:{
            js:1,
            css:1
        },
        data:{

        },
        init:function(){
            $('#save').on('click',function(){
                if(validation()){
                    console.log($('#eName').val());
                    contentTb.addRow.call(contentTb.$tb,$('#eName').val());
                    $('#settingForm').find('input:text').val('');
                    $('#myModal').modal('hide');
                };
            });
            $('body').on('click','.J-addJs',function(){
               settingPage.num.js++;
                var target=$(this).parent();
                var html=target.html().replace(/=\"(jsName(\d{0,3}))\"/g,'="$1'+settingPage.num.js+'"')
                    .replace(/=\"(jsSrc(\d{0,3}))\"/g,'="$1'+settingPage.num.js+'"')
                    .replace(/=\"(jsTargetSrc(\d{0,3}))\"/g,'="$1'+settingPage.num.js+'"');
                target.parent().append('<div class="accordion-inner">'+html+'</div>');
                settingPage.checkBtn();
            }).on('click','.J-delJs',function(){
               $(this).parent().remove();
               settingPage.checkBtn();
            }).on('click','.J-addCss',function(){
                settingPage.num.css++;
                var target=$(this).parent();
                    var html=target.html().replace(/=\"(cssName(\d{0,3}))\"/g,'="$1'+settingPage.num.css+'"')
                        .replace(/=\"(cssSrc(\d{0,3}))\"/g,'="$1'+settingPage.num.css+'"')
                        .replace(/=\"(cssTargetSrc(\d{0,3}))\"/g,'="$1'+settingPage.num.css+'"')
                        .replace(/=\"(bgRelpaceUrl(\d{0,3}))\"/g,'="$1'+settingPage.num.css+'"');
                    target.parent().append('<div class="accordion-inner">'+html+'</div>');
                settingPage.checkBtn();
            }).on('click','.J-delCss',function(){
                    $(this).parent().remove();
                    settingPage.checkBtn();
            });
            settingPage.checkBtn();
        },
        checkBtn:function(){
            $('#settingForm').find('div.accordion-group').each(function(j){
                var $inner=$(this).find('div.accordion-inner');

                if($inner.length===1){//只有一个元素把删除隐藏
                    $inner.find('.btn-danger').hide();
                    $(this).find('.btn-success').show();
                }else{//超过一个
                    $inner.each(function(i){
                        if(i<($inner.length-1)){//非最后一个时隐藏新增按钮显示删除按钮
                            $(this).find('.btn-success').hide();//新增按钮
                            $(this).find('.btn-danger').show();//删除按钮
                        }else{//最后一个时两个按钮都显示
                            $(this).find('.btn-success').show();
                            $(this).find('.btn-danger').show();
                        }
                    });
                }





            });
        }

    };

    settingPage.init();




    /**
     * 验证
     * @return {Boolean}
     */
    function validation(){


        return true;
    }



});