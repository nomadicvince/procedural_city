window.addEventListener('DOMContentLoaded', function(){
    // get the canvas DOM element
    const canvas = document.getElementById('renderCanvas');

    // load the 3D engine
    const engine = new BABYLON.Engine(canvas, true);


    // createScene function that creates and return the scene
    let createScene = function(){
        // create a basic BJS Scene object
        let scene = new BABYLON.Scene(engine);

        //Materials
        const skyMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
        skyMaterial.backFaceCulling = false;
        const skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
        skybox.material = skyMaterial;

        const grass = new BABYLON.StandardMaterial("myMaterial", scene);
        grass.diffuseColor = new BABYLON.Color3(0, 1, 0);


       
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 2,-17), scene);

        // target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // attach the camera to the canvas
        camera.attachControl(canvas, false);

        // create a basic light, aiming 0,1,0 - meaning, to the sky
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);


        //Building mesh
        const box = BABYLON.MeshBuilder.CreateBox("box", {height: 2 + Math.random(), size: .2, bottomBaseAt: 2}, scene);
        box.position = new BABYLON.Vector3(0, 0, 0);
        box.setPivotMatrix(BABYLON.Matrix.Translation(0, 1, 0));


        //Procedural city loop
        let instanceCount = 10000;
        for (let index = 0; index < instanceCount - 1; index++) {
            let instance = box.createInstance("box" + index );

            //random instance
            instance.position.x = 20 - Math.random() * 40;
            instance.position.z = 20 - Math.random() * 40;

  
            instance.scaling.y = Math.random();


            instance.alwaysSelectAsActiveMesh = true;
        }

        // Add and manipulate meshes in the scene
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 40.5, width: 40.5, subdivisions: 4}, scene);
        ground.material = grass;

        // return the created scene
        return scene;
    }

    // call the createScene function
    let scene = createScene();

    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
});