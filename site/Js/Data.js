/**
 * Created with JetBrains WebStorm.
 * User: tclh123
 * Date: 13-3-24
 * Time: 上午9:41
 * To change this template use File | Settings | File Templates.
 */

AR.Data = function(Models) {

    var cache = {};
    var cacheMax = 5;

    // 数据
    var pages = [

        // page
        {
            markerId: 0,
            models: [
                {
                    modelType: AR.Models.ModelType.video,
                    modelWidth: 400 *672/378,
                    modelHeight: 400,
                    modelLeftTopX: 0,
                    modelLeftTopY: 339,
                    markerLeftTopX: 550,
                    markerLeftTopY: 773,
                    markerSize: 120,    // 在硬质媒体上，印有marker的大小
                    attach: {
                        src: 'Uploads/Movie/ImagineCup.mp4',
//                        src: 'https://github.com/tclh123/ARReading-Html5/blob/master/site/Uploads/Movie/ImagineCup.mp4?raw=true',
                        width: 672,
                        height: 378,
                        isLoop: true
                    },
                    clickEventCallback: function(e){    // TODO: 要上线的话，这里要提供固定的几种clickEventCallback。
                        if(e.clickCount%2)
                            e.domElement.play();
                        else
                            e.domElement.pause();
                    }
                }
            ]
        },

        // page
        {
            markerId: 1,
            models: [
                {
                    modelType: AR.Models.ModelType.audio,
                    modelWidth: 123,
                    modelHeight: 129,
                    modelLeftTopX: 20,
                    modelLeftTopY: 221,
                    markerLeftTopX: 400,
                    markerLeftTopY: 615,
                    markerSize: 80,
                    attach: {
                        src: 'Uploads/Audio/noun.mp3',
                        isAutoplay: false,
                        imageTexSrc: 'Uploads/Image/blank.png'
                    },
                    clickEventCallback: function(e){            // TODO: 要上线的话，这里要提供固定的几种clickEventCallback。
                        if(e.clickCount%2){
                            e.domElement.play();
                            e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/continue.png');
                        }
                        else{
                            e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/blank.png');
                        }
                    }
                },

                {
                    modelType: AR.Models.ModelType.audio,
                    modelWidth: 116,
                    modelHeight: 137,
                    modelLeftTopX: 383,
                    modelLeftTopY: 262,
                    markerLeftTopX: 400,
                    markerLeftTopY: 615,
                    markerSize: 80,
                    attach: {
                        src: 'Uploads/Audio/pronoun.mp3',
                        isAutoplay: false,
                        imageTexSrc: 'Uploads/Image/blank.png'
                    },
                    clickEventCallback: function(e){
                        if(e.clickCount%2){
                            e.domElement.play();
                            e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/continue.png');
                        }
                        else{
                            e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/blank.png');
                        }
                    }
                },

                {
                    modelType: AR.Models.ModelType.audio,
                    modelWidth: 96,
                    modelHeight: 76,
                    modelLeftTopX: 37,
                    modelLeftTopY: 352,
                    markerLeftTopX: 400,
                    markerLeftTopY: 615,
                    markerSize: 80,
                    attach: {
                        src: 'Uploads/Audio/adjective.mp3',
                        isAutoplay: false,
                        imageTexSrc: 'Uploads/Image/blank.png'
                    },
                    clickEventCallback: function(e){
                        if(e.clickCount%2){
                            e.domElement.play();
                            e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/continue.png');
                        }
                        else{
                            e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/blank.png');
                        }
                    }
                },

                {
                    modelType: AR.Models.ModelType.audio,
                    modelWidth: 247,
                    modelHeight: 406,
                    modelLeftTopX: 140,
                    modelLeftTopY: 250,
                    markerLeftTopX: 400,
                    markerLeftTopY: 615,
                    markerSize: 80,
                    attach: {
                        src: 'Uploads/Audio/Text.mp3',
                        isAutoplay: false,
                        imageTexSrc: 'Uploads/Image/blank.png'
                    },
                    clickEventCallback: function(e){
                        if(e.clickCount%2){
                            e.domElement.play();
                            e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/continue.png');
                        }
                        else{
                            e.domElement.pause();
                            e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/blank.png');
                        }
                    }
                }

            ]
        },

        // page
        {
            markerId: 2,
            models: [
                {           // TODO ， obj3d 类型 的 Model。 待数据化
                    modelType: AR.Models.ModelType.obj3d,

                    modelMidX: 252,
                    modelMidY: 331,
                    markerLeftTopX: 363,
                    markerLeftTopY: 548,
                    markerSize: 80,

                    attach: {
                        loader: new THREE.BinaryLoader(),
                        url: 'Uploads/3DModel/veyron/VeyronNoUv_bin.js',
                        material: new THREE.MeshFaceMaterial([
                            AR.Data.mlib[ "Black rough" ],		// tires + inside
                            AR.Data.mlib[ "Pure chrome" ],		// wheels + extras chrome
                            AR.Data.mlib[ "Orange metal" ], 			// back / top / front torso
                            AR.Data.mlib[ "Dark glass" ],		// glass
                            AR.Data.mlib[ "Pure chrome" ],		// sides torso
                            AR.Data.mlib[ "Pure chrome" ],		// engine
                            AR.Data.mlib[ "Red glass 50" ],		// backlights
                            AR.Data.mlib[ "Orange glass 50" ]	// backsignals
                        ]),
                        scale: 2,
                        rotation: [0, Math.PI/2, 0],
                        callback: function(model) {    // TODO: 这个callback，应该放在处理数据的地方
                            model.obj.position.x = -240;
                            model.obj.position.y = 356+100;
                            Models.addModel(2, model);
                        }
                    }
                }
            ]
        }

    ];

    this.getPage = function(markerId) {
        for(var i in pages) {
            if(pages[i].markerId == markerId) {
                return pages[i];
            }
        }
        return null;
    };

    // 通用接口
    this.loadPage = function(markerId) {

        // 没命中
        if(!cache[markerId]) {

            // 根据 markerId 获取 page，加载 models
            var page = this.getPage(markerId);
            if(page && page.models) {

                // TODO: cache strateges，现在是全清空
                // TODO
                // 点击事件没法处理干净...先都清空吧...
//                if(propertyCount(cache) > cacheMax) {

                if(propertyCount(cache) > 0) {
                    Models.clearModels();

                    for(var i in cache) {
                        delete cache[i];
                    }
                }

                cache[markerId] = {};
                cache[markerId].used = 0;

                for(var i in page.models) {
                    var modelData = page.models[i];

                    if(modelData.modelType == AR.Models.ModelType.obj3d) {  //   模型要用callback
                        var model3d = Models.createModel(modelData.modelType, 0, 0, modelData.attach);

                    } else {
                        var model = Models.createModel(modelData.modelType, modelData.modelWidth, modelData.modelHeight, modelData.attach);

                        var scale = MARKER_SIZE/modelData.markerSize;
                        var offsetX = ((modelData.markerLeftTopX+modelData.markerSize/2)-(modelData.modelLeftTopX+modelData.modelWidth/2))*scale;
                        var offsetY = ((modelData.markerLeftTopY+modelData.markerSize/2)-(modelData.modelLeftTopY+modelData.modelHeight/2))*scale;

                        model.obj.position.x = -offsetX;
                        model.obj.position.y = offsetY;

                        Models.addModel(page.markerId, model, modelData.clickEventCallback);
                    }
                }
            }
        } else {
            cache[markerId].used++;
        }
    };

    //////////////////////////////////////////////////////


//    // imagine cup 视频
//    this.loadPage1 = function() {
//        Models.clearModels();
//
//        // 根据 markerId 获取 page，加载 models
//        var page = this.getPage(0);
//        if(page && page.models) {
//            for(var i in page.models) {
//                var modelData = page.models[i];
//
//                var model = Models.createModel(modelData.modelType, modelData.modelWidth, modelData.modelHeight, modelData.attach);
//
//                var scale = MARKER_SIZE/modelData.markerSize;
//                var offsetX = ((modelData.markerLeftTopX+modelData.markerSize/2)-(modelData.modelLeftTopX+modelData.modelWidth/2))*scale;
//                var offsetY = ((modelData.markerLeftTopY+modelData.markerSize/2)-(modelData.modelLeftTopY+modelData.modelHeight/2))*scale;
//
//                model.obj.position.x = -offsetX;
//                model.obj.position.y = offsetY;
//
//                Models.addModel(page.markerId, model, modelData.clickEventCallback);
//            }
//        }
//    };
//
//    // Car Models
//    this.loadPage2 = function() {
//        Models.clearModels();
//
//        // TODO
//        // 模型要用callback，暂时特殊处理...
//        // 并根据模型选择Loader...
//
//        // obj3d
//        var model3d = Models.createModel(AR.Models.ModelType.obj3d, 0, 0, {
//            loader: new THREE.BinaryLoader(),
//            url:'Uploads/3DModel/veyron/VeyronNoUv_bin.js',
//            material: new THREE.MeshFaceMaterial([
//                AR.Data.mlib[ "Black rough" ],		// tires + inside
//                AR.Data.mlib[ "Pure chrome" ],		// wheels + extras chrome
//                AR.Data.mlib[ "Orange metal" ], 			// back / top / front torso
//                AR.Data.mlib[ "Dark glass" ],		// glass
//                AR.Data.mlib[ "Pure chrome" ],		// sides torso
//                AR.Data.mlib[ "Pure chrome" ],		// engine
//                AR.Data.mlib[ "Red glass 50" ],		// backlights
//                AR.Data.mlib[ "Orange glass 50" ]	// backsignals
//            ]),
//            scale: 2,
//            rotation: [0, Math.PI/2, 0],
//            callback: function(model) {
////                model.obj.position.x = -240;
////                model.obj.position.y = 296;
//                model.obj.position.x = -240;
//                model.obj.position.y = 356+100;
//                Models.addModel(2, model);
//            }
//        });
//
//    };
//
//    // 点读机
//    this.loadPage3 = function() {
//        Models.clearModels();
//
//        // 根据 markerId 获取 page，加载 models
//        var page = this.getPage(1);
//        if(page && page.models) {
//            for(var i in page.models) {
//                var modelData = page.models[i];
//
//                var model = Models.createModel(modelData.modelType, modelData.modelWidth, modelData.modelHeight, modelData.attach);
//
//                var scale = MARKER_SIZE/modelData.markerSize;
//                var offsetX = ((modelData.markerLeftTopX+modelData.markerSize/2)-(modelData.modelLeftTopX+modelData.modelWidth/2))*scale;
//                var offsetY = ((modelData.markerLeftTopY+modelData.markerSize/2)-(modelData.modelLeftTopY+modelData.modelHeight/2))*scale;
//
//                model.obj.position.x = -offsetX;
//                model.obj.position.y = offsetY;
//
//                Models.addModel(page.markerId, model, modelData.clickEventCallback);
//            }
//        }
//    };

};

// test Materials
AR.Data.mlib = {

    "Orange": 	new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0xff2200, combine: THREE.MixOperation, reflectivity: 0.3 } ),
    "Blue": 	new THREE.MeshLambertMaterial( { color: 0x001133, ambient: 0x001133, combine: THREE.MixOperation, reflectivity: 0.3 } ),
    "Red": 		new THREE.MeshLambertMaterial( { color: 0x660000, ambient: 0x330000, combine: THREE.MixOperation, reflectivity: 0.25 } ),
    "Black": 	new THREE.MeshLambertMaterial( { color: 0x000000, ambient: 0x000000, combine: THREE.MixOperation, reflectivity: 0.15 } ),
    "White":	new THREE.MeshLambertMaterial( { color: 0xffffff, ambient: 0x666666, combine: THREE.MixOperation, reflectivity: 0.25 } ),

    "Carmine": 	new THREE.MeshPhongMaterial( { color: 0x770000, specular:0xffaaaa, combine: THREE.MultiplyOperation } ),
    "Gold": 	new THREE.MeshPhongMaterial( { color: 0xaa9944, specular:0xbbaa99, shininess:50, combine: THREE.MultiplyOperation } ),
    "Bronze":	new THREE.MeshPhongMaterial( { color: 0x150505, specular:0xee6600, shininess:10, combine: THREE.MixOperation, reflectivity: 0.25 } ),
    "Chrome": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular:0xffffff, combine: THREE.MultiplyOperation } ),

    "Orange metal": new THREE.MeshLambertMaterial( { color: 0xff6600, ambient: 0xff2200, combine: THREE.MultiplyOperation } ),
    "Blue metal": 	new THREE.MeshLambertMaterial( { color: 0x001133, ambient: 0x002266, combine: THREE.MultiplyOperation } ),
    "Red metal": 	new THREE.MeshLambertMaterial( { color: 0x770000, combine: THREE.MultiplyOperation } ),
    "Green metal": 	new THREE.MeshLambertMaterial( { color: 0x007711, combine: THREE.MultiplyOperation } ),
    "Black metal":	new THREE.MeshLambertMaterial( { color: 0x222222, combine: THREE.MultiplyOperation } ),

    "Pure chrome": 	new THREE.MeshLambertMaterial( { color: 0xffffff } ),
    "Dark chrome":	new THREE.MeshLambertMaterial( { color: 0x444444 } ),
    "Darker chrome":new THREE.MeshLambertMaterial( { color: 0x222222 } ),

    "Black glass": 	new THREE.MeshLambertMaterial( { color: 0x101016, opacity: 0.975, transparent: true } ),
    "Dark glass":	new THREE.MeshLambertMaterial( { color: 0x101046, opacity: 0.25, transparent: true } ),
    "Blue glass":	new THREE.MeshLambertMaterial( { color: 0x668899, opacity: 0.75, transparent: true } ),
    "Light glass":	new THREE.MeshBasicMaterial( { color: 0x223344, opacity: 0.25, transparent: true, combine: THREE.MixOperation, reflectivity: 0.25 } ),

    "Red glass":	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.75, transparent: true } ),
    "Yellow glass":	new THREE.MeshLambertMaterial( { color: 0xffffaa, opacity: 0.75, transparent: true } ),
    "Orange glass":	new THREE.MeshLambertMaterial( { color: 0x995500, opacity: 0.75, transparent: true } ),

    "Orange glass 50":	new THREE.MeshLambertMaterial( { color: 0xffbb00, opacity: 0.5, transparent: true } ),
    "Red glass 50": 	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ),

    "Fullblack rough":	new THREE.MeshLambertMaterial( { color: 0x000000 } ),
    "Black rough":		new THREE.MeshLambertMaterial( { color: 0x050505 } ),
    "Darkgray rough":	new THREE.MeshLambertMaterial( { color: 0x090909 } ),
    "Red rough":		new THREE.MeshLambertMaterial( { color: 0x330500 } ),

    "Darkgray shiny":	new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x050505 } ),
    "Gray shiny":		new THREE.MeshPhongMaterial( { color: 0x050505, shininess: 20 } )

};