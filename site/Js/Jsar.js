/**
 * Inception - AR Reading App.
 * User: tclh123
 * Date: 12-8-29
 * Time: 上午11:03
 * Copyright (C)2012 Inception Team
 */
AR.Jsar = function(canvas, width, height, markerSize, threshold, slowness){
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.threshold = threshold || 90;
    this.slowness = slowness || 10;

    //
    var raster = new NyARRgbRaster_Canvas2D(this.canvas);        //[!!]  给canvas 给 AR，
    var param = new FLARParam(this.width, this.height);
    var detector = new FLARMultiIdMarkerDetector(param, markerSize);   //marker size
    detector.setContinueMode(true);

    this.getARMat = function(){
        var ARMat = new Float32Array(16);
        param.copyCameraMatrix(ARMat, 10, 10000);       //[!!] AR 给ARMat 给 3d
        return ARMat;
    };

    var markers = {};
    var resultMat = new NyARTransMatResult();

    this.detect = function(scene){
        // detected -> markers(model & AR TransformMatrix)
        var detected = detector.detectMarkerLite(raster, this.threshold);
        //console.log('cnt='+detected);
        for (var idx = 0; idx < detected; idx++) {
            var id = detector.getIdMarkerData(idx);
            var currId;
            if (id.packetLength > 4) {
                currId = -1;
            } else {
                currId = 0;
                for (var i = 0; i < id.packetLength; i++) {
                    currId = (currId << 8) | id.getPacketData(i);
                }
            }
            //console.log('currId='+currId);
            if (!markers[currId]) {
                markers[currId] = {};
            }
            detector.getTransformMatrix(idx, resultMat);
            markers[currId].age = 0;
            markers[currId].transform = Object.asCopy(resultMat);
        }
        // tracking. age-algorithm
        for (var i in markers) {
            var r = markers[i];
            //if (r.age > 1) {
            if (r.age > this.slowness) {   //越大越缓和
                delete markers[i];
                scene.remove(r.model);
            }
            r.age++;
        }
        return markers;
    }

    // 16 array -> 4x4 mat
    THREE.Matrix4.prototype.setFromArray = function(m) {
        return this.set(m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]);
    };

    // ARmat -> GLmat
    this.copyMatrix = function (mat, cm) {
        cm[0] = mat.m00;
        cm[1] = -mat.m10;
        cm[2] = mat.m20;
        cm[3] = 0;
        cm[4] = mat.m01;
        cm[5] = -mat.m11;
        cm[6] = mat.m21;
        cm[7] = 0;
        cm[8] = -mat.m02;
        cm[9] = mat.m12;
        cm[10] = -mat.m22;
        cm[11] = 0;
        cm[12] = mat.m03;
        cm[13] = -mat.m13;
        cm[14] = mat.m23;
        cm[15] = 1;
    }
};