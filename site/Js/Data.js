/**
 * Created with JetBrains WebStorm.
 * User: tclh123
 * Date: 13-3-24
 * Time: 上午9:41
 * To change this template use File | Settings | File Templates.
 */

AR.Data = function(Models) {

    // imagine cup 视频
    this.loadPage1 = function() {
        Models.clearModels();

        // movie
        var movieHeight = 400;
        var movieModel = Models.createModel(AR.Models.ModelType.video, movieHeight*672/378, movieHeight, {
            src: 'Uploads/Movie/ImagineCup.mp4',
            width: 672,
            height: 378,
            isLoop: true
        }); //672 × 378

        movieModel.obj.position.x = -240;
        movieModel.obj.position.y = 296;

        Models.addModel(0, movieModel, function(e){
            if(e.clickCount%2)
                e.domElement.play();
            else
                e.domElement.pause();
        });
    };

    // Car Models
    this.loadPage2 = function() {
        Models.clearModels();

//        // movie
//        var movieHeight = 400;
//        var movieModel = Models.createModel(AR.Models.ModelType.video, movieHeight*592/252, movieHeight, {
//            src: 'Uploads/Movie/wow.mp4',
//            width: 592,
//            height: 252,
//            isLoop: true
//        }); //592 × 252
//
//        movieModel.obj.position.x = 60;
//        movieModel.obj.position.y = 300;
//
//        Models.addModel(4, movieModel, function(e){
//            if(e.clickCount%2)
//                e.domElement.play();
//            else
//                e.domElement.pause();
//        });

        // obj3d
//        var model3d = Models.createModel(AR.Models.ModelType.obj3d, 0, 0, {
//            loader: new THREE.OBJLoader(),
//            url:'Uploads/3DModel/male02/male02.obj',
//            scale: 3,
//            rotation: [Math.PI/2, 0, Math.PI],
//            callback: function(model) {
//                Models.addModel(0, model);
//            }
//        });

        // 2 obj3d
        var model3d = Models.createModel(AR.Models.ModelType.obj3d, 0, 0, {
            loader: new THREE.BinaryLoader(),
            url:'Uploads/3DModel/veyron/VeyronNoUv_bin.js',
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
            callback: function(model) {
//                model.obj.position.x = -240;
//                model.obj.position.y = 296;
                model.obj.position.x = -240;
                model.obj.position.y = 356+100;
                Models.addModel(0, model);
            }
        });

        var model3d_second = Models.createModel(AR.Models.ModelType.obj3d, 0, 0, {
            loader: new THREE.BinaryLoader(),
            url:'Uploads/3DModel/gallardo/GallardoNoUv_bin.js',
            material: new THREE.MeshFaceMaterial([
                AR.Data.mlib[ "Pure chrome" ], 	// wheels chrome
                AR.Data.mlib[ "Black rough" ],   // tire
                AR.Data.mlib[ "Black glass" ], 	// windshield
                AR.Data.mlib[ "Green metal" ], 		// body
                AR.Data.mlib[ "Red glass" ],    	// back lights
                AR.Data.mlib[ "Yellow glass" ],  // front lights
                AR.Data.mlib[ "Dark chrome" ]	// windshield rim
            ]),
            scale: 0.5,
            rotation: [-Math.PI/2,0, 0],
            callback: function(model) {
                model.obj.position.x = -240;
                //model.obj.position.y = 356-100;
                Models.addModel(0, model);
            }
        });

        var model3d_third = Models.createModel(AR.Models.ModelType.obj3d, 0, 0, {
            loader: new THREE.BinaryLoader(),
            url:'Uploads/3DModel/camaro/CamaroNoUv_bin.js',
            material: new THREE.MeshFaceMaterial([
                AR.Data.mlib[ "Orange" ], 			// car body
                AR.Data.mlib[ "Pure chrome" ], 		// wheels chrome
                AR.Data.mlib[ "Pure chrome" ], 		// grille chrome
                AR.Data.mlib[ "Dark chrome" ], 		// door lines
                AR.Data.mlib[ "Light glass" ], 		// windshield
                AR.Data.mlib[ "Gray shiny" ],        // interior
                AR.Data.mlib[ "Black rough" ],       // tire
                AR.Data.mlib[ "Fullblack rough" ],   // tireling
                AR.Data.mlib[ "Fullblack rough" ]    // behind grille
            ]),
            scale: 0.5,
            rotation: [-Math.PI/2,0, 0],
            callback: function(model) {
                model.obj.position.x = -240+100;
                //model.obj.position.y = 356;
                Models.addModel(0, model);
            }
        });
    };

    // 点读机
    this.loadPage3 = function() {
        Models.clearModels();

        // audio-1
        var audioModel1 = Models.createModel(AR.Models.ModelType.audio, 123, 129, {
            src: 'Uploads/Audio/noun.mp3',
            isAutoplay: false,
            imageTexSrc: 'Uploads/Image/blank.png'
        });

        var scale = 120/80;
        var offsetX = ((400+80/2)-(20+123/2))*scale;
        var offsetY = ((615+80/2)-(221+129/2))*scale;

        audioModel1.obj.position.x = -offsetX;
        audioModel1.obj.position.y = offsetY;

        Models.addModel(1, audioModel1,
            function(e){
                if(e.clickCount%2){
                    e.domElement.play();
                    e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/continue.png');
                }
                else{
                    e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/blank.png');
                }
            }
        );

        // audio-2
        var audioModel2 = Models.createModel(AR.Models.ModelType.audio, 116, 137, {
            src: 'Uploads/Audio/pronoun.mp3',
            isAutoplay: false,
            imageTexSrc: 'Uploads/Image/blank.png'
        });

        scale = 120/80;
        offsetX = ((400+80/2)-(383+116/2))*scale;
        offsetY = ((615+80/2)-(262+137/2))*scale;

        audioModel2.obj.position.x = -offsetX;
        audioModel2.obj.position.y = offsetY;

        Models.addModel(1, audioModel2, function(e){
            if(e.clickCount%2){
                e.domElement.play();
                e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/continue.png');
            }
            else{
                e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/blank.png');
            }
        });

        // audio-3
        var audioModel3 = Models.createModel(AR.Models.ModelType.audio, 96, 76, {
            src: 'Uploads/Audio/adjective.mp3',
            isAutoplay: false,
            imageTexSrc: 'Uploads/Image/blank.png'
        });

        scale = 120/80;
        offsetX = ((400+80/2)-(37+96/2))*scale;
        offsetY = ((615+80/2)-(352+76/2))*scale;

        audioModel3.obj.position.x = -offsetX;
        audioModel3.obj.position.y = offsetY;

        Models.addModel(1, audioModel3, function(e){
            if(e.clickCount%2){
                e.domElement.play();
                e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/continue.png');
            }
            else{
                e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/blank.png');
            }
        });

        // audio-4
        var audioModel4 = Models.createModel(AR.Models.ModelType.audio, 247, 406, {
            src: 'Uploads/Audio/Text.mp3',
            isAutoplay: false,
            imageTexSrc: 'Uploads/Image/blank.png'
        });

        scale = 120/80;
        offsetX = ((400+80/2)-(140+247/2))*scale;
        offsetY = ((615+80/2)-(250+406/2))*scale;

        audioModel4.obj.position.x = -offsetX;
        audioModel4.obj.position.y = offsetY;

        Models.addModel(1, audioModel4, function(e){
            if(e.clickCount%2){
                e.domElement.play();
                e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/continue.png');
            }
            else{
                e.domElement.pause();
                e.obj.material.map =  THREE.ImageUtils.loadTexture('Uploads/Image/blank.png');
            }
        });
    };

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

}