export default class Form {

    static simplePrepare(obj){
        let formData = new FormData();
        Object.keys(obj).forEach(function(element) {
            if(!(obj[element] && !obj[element].type)){
                if(obj[element].type === "text" || obj[element].type === "textarea" || obj[element].type === "password"){
                    formData.append(element, obj[element].value);
                }else if(obj[element].type === "file"){
                    if(obj[element].files.length > 0) {
                        formData.append(element, obj[element].files[0], obj[element].files[0].name);
                    }
                }
            }
        });
    }

    static prepare(obj, form = null){
        let formData = form !== null ? form : new FormData();
        Object.keys(obj).forEach(function(element) {
            if(obj[element] && !obj[element].type){

                if(obj[element].src){
                    formData.append(element, Form.dataURItoBlob(obj[element].src));
                }
                else if(obj[element].nodeName && obj[element].nodeName === "CANVAS"){
                    formData.append(element, Form.dataURItoBlob(obj[element].toDataURL()));
                }
                else if(Array.isArray(obj[element])){


                    for (var i = 0; i < obj[element].length; i++) {
                        if(obj[element][i] && obj[element][i].path){
                            formData.append(element, Form.dataURItoBlob(obj[element][i].path));
                        }
                        else{
                            if(!obj[element][i]){
                                continue;
                            }
                            formData = Form.objectToFormdata(formData, element+'[' + i + ']', obj[element][i]);
                        }

                    }
                }
                else if(obj[element].path){
                    formData.append(element, Form.dataURItoBlob(obj[element].path));
                }
                else{
                    formData = Form.objectToFormdata(formData, element, obj[element]);
                }
            }
            else if(obj[element] && obj[element].type){
                if(obj[element].type === "text" || obj[element].type === "textarea" || obj[element].type === "password"){
                    formData.append(element, obj[element].value);
                }else if(obj[element].type === "file"){
                    if(obj[element].files.length > 0) {
                        formData.append(element, obj[element].files[0], obj[element].files[0].name);
                    }
                }
            }
        });
        return formData;
    }

    static dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }

    static setValue(elm, value) {
        elm.value = value;
        elm.defaultValue = value;
        elm.dispatchEvent(new Event("input", {bubbles: true, target: elm, data: value}));
    }

    static objectToFormdata(formData, element, item){

        if(item === undefined || item === null){
            return formData;
        }

        if(item.nodeName && item.nodeName === "CANVAS"){
            formData.append(element, Form.dataURItoBlob(item.toDataURL()));
            //
        }
        else if (item instanceof Object){

            for ( var key in item ) {

                formData = Form.objectToFormdata(formData, element + '[' + key + ']', item[key]);
            }
        }
        else{
            formData.append(element, item);
        }

        return formData;
    }
}

