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
            src: 'Uploads/ImagineCup.mp4',
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

    // 魔兽视频
    this.loadPage2 = function() {
        Models.clearModels();

        // movie
        var movieHeight = 400;
        var movieModel = Models.createModel(AR.Models.ModelType.video, movieHeight*592/252, movieHeight, {
            src: 'Uploads/wow.mp4',
            width: 592,
            height: 252,
            isLoop: true
        }); //592 × 252

        movieModel.obj.position.x = 60;
        movieModel.obj.position.y = 300;

        Models.addModel(4, movieModel, function(e){
            if(e.clickCount%2)
                e.domElement.play();
            else
                e.domElement.pause();
        });
    };

    // 点读机
    this.loadPage3 = function() {
        Models.clearModels();


        // audio-1
        var audioModel1 = Models.createModel(AR.Models.ModelType.audio, 123, 129, {
            src: 'Uploads/noun.mp3',
            isAutoplay: false,
            imageTexSrc: 'textures/blank.png'
        });

        var scale = 120/80;
        var offsetX = ((400+80/2)-(20+123/2))*scale;
        var offsetY = ((615+80/2)-(221+129/2))*scale;

        audioModel1.obj.position.x = -offsetX;
        audioModel1.obj.position.y = offsetY;

        Models.addModel(1, audioModel1, function(e){
            if(e.clickCount%2){
                e.domElement.play();
                e.obj.material.map =  THREE.ImageUtils.loadTexture('textures/continue.png');
            }
            else{
                e.obj.material.map =  THREE.ImageUtils.loadTexture('textures/blank.png');
            }
        });

        // audio-2
        var audioModel2 = Models.createModel(AR.Models.ModelType.audio, 116, 137, {
            src: 'Uploads/pronoun.mp3',
            isAutoplay: false,
            imageTexSrc: 'textures/blank.png'
        });

        scale = 120/80;
        offsetX = ((400+80/2)-(383+116/2))*scale;
        offsetY = ((615+80/2)-(262+137/2))*scale;

        audioModel2.obj.position.x = -offsetX;
        audioModel2.obj.position.y = offsetY;

        Models.addModel(1, audioModel2, function(e){
            if(e.clickCount%2){
                e.domElement.play();
                e.obj.material.map =  THREE.ImageUtils.loadTexture('textures/continue.png');
            }
            else{
                e.obj.material.map =  THREE.ImageUtils.loadTexture('textures/blank.png');
            }
        });

        // audio-3
        var audioModel3 = Models.createModel(AR.Models.ModelType.audio, 96, 76, {
            src: 'Uploads/adjective.mp3',
            isAutoplay: false,
            imageTexSrc: 'textures/blank.png'
        });

        scale = 120/80;
        offsetX = ((400+80/2)-(37+96/2))*scale;
        offsetY = ((615+80/2)-(352+76/2))*scale;

        audioModel3.obj.position.x = -offsetX;
        audioModel3.obj.position.y = offsetY;

        Models.addModel(1, audioModel3, function(e){
            if(e.clickCount%2){
                e.domElement.play();
                e.obj.material.map =  THREE.ImageUtils.loadTexture('textures/continue.png');
            }
            else{
                e.obj.material.map =  THREE.ImageUtils.loadTexture('textures/blank.png');
            }
        });

        // audio-4
        var audioModel4 = Models.createModel(AR.Models.ModelType.audio, 247, 406, {
            src: 'Uploads/Text.mp3',
            isAutoplay: false,
            imageTexSrc: 'textures/blank.png'
        });

        scale = 120/80;
        offsetX = ((400+80/2)-(140+247/2))*scale;
        offsetY = ((615+80/2)-(250+406/2))*scale;

        audioModel4.obj.position.x = -offsetX;
        audioModel4.obj.position.y = offsetY;

        Models.addModel(1, audioModel4, function(e){
            if(e.clickCount%2){
                e.domElement.play();
                e.obj.material.map =  THREE.ImageUtils.loadTexture('textures/continue.png');
            }
            else{
                e.domElement.pause();
                e.obj.material.map =  THREE.ImageUtils.loadTexture('textures/blank.png');
            }
        });
    };

};