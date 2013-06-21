/**
 * User: jeff.zhang
 * Date: 13-2-26
 * Time: 下午2:58
 */
;(function(){
    "use strict";
    $.fn.jTable=function(opt){
        var _defalut={
            useIndex:true
        };
        var _options=$.extend({},_defalut,opt),
            _$tb=this,
            _$tbd=this.find('tbody'),
            _$tr;

        var table={
            len:0,
            $tbody:_$tbd,
            data:[]
        };

        if(typeof _options.data==='object' &&_options.data.slice){//如果是数组
            createTableFromArray(_options.data);
        }else{
            console.log('other');
        }

        /**
         * 从数组构造TABLE
         * @param {Array} arr
         */
        function createTableFromArray(arr){
            var i, j,tmpStr='';
            console.log(arr);
            for(i = 0;i<arr.length;i++){
                tmpStr+='<tr>';
                if(_options.useIndex){
                    tmpStr+='<td>'+(i+1)+'</td>';
                }
                for(j = 0;j<arr[i].length;j++){
                    tmpStr+='<td>'+arr[i][j]+'</td>';
                }


                tmpStr+='</tr>';
            }
            console.log(tmpStr);
            _$tbd.html(tmpStr);
            _$tr = _$tbd.find('tr');
            table.data=arr;
        }

        /**
         * 用数组形式增加一行
         * @param {Array} arr 数组
         */
        function addRow(arr){
            var _str='<tr>',i;
            table.data.push(arr);
            if(_options.useIndex){
                _str+='<td>'+table.data.length+'</td>';
            }
            for(i = 0;i<arr.length;i++){
                _str+='<td>'+arr[i]+'</td>';
            }
            _str+='</tr>';
            _$tbd.append(_str);
            _$tr=_$tbd.find('tr');
        }

        /**
         *删除一行
         * @param {Number} rowIndex
         */
        function delRow(rowIndex){
            if(rowIndex<0){
                throw "jTable->delRow(rowIndex)  rowIndex必须大于等于0";
            }
            table.data.splice(rowIndex,1);
            _$tr.eq(rowIndex).remove();
            _$tr=_$tbd.find('tr');
        }

        /**
         *根据rowIndex和colIndex修改对应td中的html内容
         * @param {Number} rowIndex
         * @param {Number} colIndex
         * @param {String} html
         */
        function editCol(rowIndex,colIndex,html){
            table.data[rowIndex][colIndex]=html;
            _$tr.eq(rowIndex).find('td').eq(colIndex).html(html);

        }



        //public
        table.addRow=addRow;
        table.delRow=delRow;
        table.editCol=editCol;
        return table;

    };
})(jQuery);
