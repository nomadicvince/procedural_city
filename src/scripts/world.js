window.addEventListener('DOMContentLoaded', function(){
    // get the canvas DOM element
    const canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    const engine = new BABYLON.Engine(canvas, true);


    // createScene function that creates and return the scene
    let createScene = function(){
        // create a basic BJS Scene object
        let scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0.027, 0.890, 0.957);

        //Materials and textures
        const grass = new BABYLON.StandardMaterial("myMaterial", scene);
        grass.diffuseColor = new BABYLON.Color3(0, 1, 0);    

        const skyScrapeMat = new BABYLON.StandardMaterial("skyScrapeMat", scene);
        skyScrapeMat.diffuseColor = new BABYLON.Color3(1, 0, 0);

        const skyScrapeMat2 = new BABYLON.StandardMaterial("skyScrapeMat2", scene);
        skyScrapeMat2.diffuseColor = new BABYLON.Color3(0, 0, 1);
       
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 2,-17), scene);

        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(-3,1,0), scene);

        //Building mesh
        const building = BABYLON.MeshBuilder.CreateBox("box", {height: 2 + Math.random(), size: .2, bottomBaseAt: 2}, scene);
        building.position = new BABYLON.Vector3(0, 0, 0);
        building.setPivotMatrix(BABYLON.Matrix.Translation(0, 1, 0));


        //Procedural city loop
        let instanceCount = 9998;
        for (let index = 0; index < instanceCount - 1; index++) {
            let instance = building.createInstance("box" + index );

            //random instance
            instance.position.x = 20 - Math.random() * 40;
            instance.position.z = 20 - Math.random() * 40;
  
            instance.scaling.y = Math.random();

            instance.alwaysSelectAsActiveMesh = false;
        }

        //Raycasting skyscrapers
        const skyscraper1 = BABYLON.MeshBuilder.CreateBox("box", {height: 3.8, size: .2, bottomBaseAt: 2}, scene);
        skyscraper1.position = new BABYLON.Vector3(1, 0, 0);
        skyscraper1.setPivotMatrix(BABYLON.Matrix.Translation(0, 1, 0));
        skyscraper1.material = skyScrapeMat;


        const skyscraper2 = BABYLON.MeshBuilder.CreateBox("box", {height: 3.5, size: .2, bottomBaseAt: 2}, scene);
        skyscraper2.position = new BABYLON.Vector3(0, 0, 10);
        skyscraper2.setPivotMatrix(BABYLON.Matrix.Translation(0, 1, 0));
        skyscraper2.material = skyScrapeMat2;

        //Raycasting
        const origin = new BABYLON.Vector3(0, 1.9, 0);
        const direction = new BABYLON.Vector3(-160, 0, 0);
        const length = 100;

        const ray = new BABYLON.Ray();
        const rayHelper = new BABYLON.RayHelper(ray);
        rayHelper.attachToMesh(skyscraper1, direction, origin, length);
        rayHelper.show(scene);
  

        // Ground mesh
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 40.5, width: 40.5, subdivisions: 6}, scene);
        ground.material = grass;

        ground.optimize(6);

        // return the created scene
        return scene;
    }

    // call the createScene function
    let scene = createScene();

    scene.createOrUpdateSelectionOctree(64, 2);

    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
});