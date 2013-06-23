/**
 * Inception - AR Reading App.
 * User: tclh123
 * Date: 12-8-29
 * Time: 下午12:00
 * Copyright (C)2012 Inception Team
 */
AR.Models = function(projector, camera){
    this.projector = projector;
    this.camera = camera;
    this._models = [];      // model info list
    this._objects = [];     // 3d objs list

    this.clearModels = function() {
        for (var i in this._models) {
            var model = this._models[i];
            if(model.modelType == AR.Models.ModelType.video || model.modelType == AR.Models.ModelType.audio) {
                model.domElement.pause();
            }
        }

        this._models = [];  // !不会内存泄露? , javascript: 原有内容将等待垃圾回收
        this._objects = [];
    };

    this.update = function() {
        for (var i in this._models) {
            var model = this._models[i];
            if(model.modelType == AR.Models.ModelType.video) {
                model.canvas.getContext('2d').drawImage(model.domElement, 0, 0);
                model.texture.needsUpdate = true;
            }
        }
    };

    /*
     attach.src
         .width
         .height
         .isLoop
         .isAutoplay
         .imageTexSrc
     */
    // 新建model
    this.createModel = function(modelType, width, height, attach) {
        var model = {};
        model['modelType'] = modelType;

        if(modelType == AR.Models.ModelType.video) {
            var video = document.createElement('video');
            video.src = attach.src;
            video.width = attach.width || 320;
            video.height = attach.height || 240;
            video.loop = attach.isLoop || true;
            video.style.display = 'none';
            video.controls = true;

            // create video Canvas
            var videoCanvas = document.createElement('canvas');
            videoCanvas.width = video.width;
            videoCanvas.height = video.height;
            var videoTex = new THREE.Texture(videoCanvas);

            model['domElement'] = video;
            model['canvas'] = videoCanvas;
            model['texture'] = videoTex;
            model['obj'] = new THREE.Mesh(new THREE.PlaneGeometry(width, height, 0), new THREE.MeshBasicMaterial({
                map: videoTex
            }));
        } else if(modelType == AR.Models.ModelType.audio) {
            var audio = document.createElement('audio');
            audio.autoplay = attach.isAutoplay || false;
            audio.src = attach.src;

            model['domElement'] = audio;
            model['obj'] = new THREE.Mesh(new THREE.PlaneGeometry(width, height, 0), new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(attach.imageTexSrc)
            }));
        } else if(modelType == AR.Models.ModelType.picture) {
            model['obj'] = new THREE.Mesh(new THREE.PlaneGeometry(width, height, 0), new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(attach.imageTexSrc)
            }));
        }

        return model;
    };

    //加Model
    this.addModel = function(idMarker, model, onclick){

        model['idMarker'] = idMarker;

        model['onclick'] = onclick || function(){};
        model['clickCount'] = 0;

        this._models.push(model);
        this._objects.push(model.obj);
    };

    // 返回列表
    this.getModel = function(idMarker){
        var ret = [];
        for(var i in this._models){
            if(this._models[i].idMarker == idMarker){
                //console.log('find'+this._models[i].idMarker);
                 ret.push(this._models[i].obj);
            }
        }
        return ret;
    };

    //相交物体
    this.intersect = function(ray){
        var intersects = ray.intersectObjects( this._objects );
        if ( intersects.length > 0 ) {
            //for ( var i = 0, l = this._objects.length; i < l; i ++ ) {
            for(var i in this._objects){
                //console.log('searching');
                if(intersects[ 0 ].object == this._objects[i]){
                    //console.log('yes='+i);
                    var id = i;
                    break;
                }
            }
            this._models[id].clickCount++;
            this._models[id].onclick(this._models[id]);
            return intersects[ 0 ].point;
        }
    }
};

AR.Models.ModelType = {
    picture: 1,
//    button: 2,
    video: 4,
    audio: 8, //audio button，按钮-播放
    obj3d: 16
};