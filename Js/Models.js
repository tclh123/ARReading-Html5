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
    this._models = [];
    this._objects = [];

    //新加Model
    this.addModel = function(idMarker, model, modelType, onclick){
        console.log(idMarker+' '+model);
        this._models.push({
            idMarker: idMarker,
            model: model,
            modelType: modelType,
            //onclick: onclick || this.Defaults[modelType],
            onclick: onclick || function(){},
            clickCount: 0
            //attach: attach || {}
        });
        this._objects.push(model);
    };

    this.getModel = function(idMarker){
        for(var i in this._models){
            if(this._models[i].idMarker == idMarker){
                //console.log('find'+this._models[i].idMarker);
                return this._models[i].model;
            }
        }
        //return this._models[0].model;
    }

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
    button: 2,
    video: 4,
    obj3d: 8
};