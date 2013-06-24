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

            video.addEventListener("loadstart", function() {
                $('#loadinggif').show();
            }, false);
            video.addEventListener("canplay", function() {
                $('#loadinggif').hide();
            }, false);


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
            model['obj'] = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({
                map: videoTex,
//                overdraw: true,             // overdraw
                side: THREE.DoubleSide
            }));
        } else if(modelType == AR.Models.ModelType.audio) {

            // 放到前面，避免被阻塞?？
            model['obj'] = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(attach.imageTexSrc),
//                overdraw: true,             // overdraw
                transparent: true,
                side: THREE.DoubleSide
            }));

            var audio = document.createElement('audio');

            audio.addEventListener("loadstart", function() {
                $('#loadinggif').show();
            }, false);
            audio.addEventListener("canplay", function() {
                $('#loadinggif').hide();
            }, false);

            audio.autoplay = attach.isAutoplay || false;
            audio.src = attach.src;

            model['domElement'] = audio;

        } else if(modelType == AR.Models.ModelType.picture) {
            model['obj'] = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(attach.imageTexSrc),
//                overdraw: true,             // overdraw
                transparent: true,
                side: THREE.DoubleSide
            }));

        } else if(modelType == AR.Models.ModelType.obj3d) {
            var loader = attach.loader;

            $('#loadinggif').show();
            loader.load( attach.url,
                function( e ) {
                    $('#loadinggif').hide();

                    var obj;
                    if(e instanceof THREE.Geometry) {
                        // material
                        obj = new THREE.Mesh(e, attach.material ); //Material
                    } else if(e instanceof THREE.Object3D) {
                        obj = e;
                        // texture
                        // need to deal with Object3D.children(mesh).material.map <- texture
                    }

                    if(attach.rotation) {
                        obj.rotation.x = attach.rotation[ 0 ];
                        obj.rotation.y = attach.rotation[ 1 ];
                        obj.rotation.z = attach.rotation[ 2 ];
                    }
                    if(attach.scale) {
                        obj.scale.x = obj.scale.y = obj.scale.z = attach.scale;
                    }

                    model['obj'] = obj;

                    attach.callback(model);
                }
            );
        }

        return model;
    };

    //加Model
    this.addModel = function(idMarker, model, onclick, onhover, nohover){

        model['idMarker'] = idMarker;

        model['onclick'] = onclick || function(){};
        model['onhover'] = onhover || function(){};
        model['nohover'] = nohover || function(){};
        model['clickCount'] = 0;

        model.obj.idx = this._models.length;    // 维护下标

        this._models.push(model);
        this._objects.push(model.obj);
    };

    // 返回列表
    this.getModel = function(idMarker){
        var ret = [];
        for(var i in this._models){
            if(this._models[i].idMarker == idMarker){   // MarkerId

                //console.log('find'+this._models[i].idMarker);
                 ret.push(this._models[i].obj);
            }
        }
        return ret;
    };

    //相交物体
    this.intersect = function(ray){
        var intersects = ray.intersectObjects( this._objects );   // 不能用 scene.children，因为每个page其实只有一个Object3D（里面又有小obj）

        if ( intersects.length > 0 ) {
            for(var i in this._objects){
                if(intersects[ 0 ].object == this._objects[i]){
                    var id = i;
                    break;
                }
            }

            return id;
        }
        return -1;
    }
};

AR.Models.ModelType = {
    picture: 1,
//    button: 2,
    video: 4,
    audio: 8, //audio button，按钮-播放
    obj3d: 16
};