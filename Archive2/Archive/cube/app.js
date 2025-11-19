Famous.loaded(function () {
    var Engine = Famous.Core.Engine,
        Modifier = Famous.Core.Modifier,
        Surface = Famous.Core.Surface,
        Transform = Famous.Core.Transform,
        Timer = Famous.Utilities.Timer,
        convert = Math.PI/180,
        matrix = [], x, y, rot, scale, xlt, 
        rotate = [
            [0, 0, 0],
            [0, 90, 0],
            [0, -90, 0],
            [0, 0, 0],
            [90, 0, 0],
            [-90, 0, 0]
        ],
        size = 100;
        xlate = [
            [0, 0, size],
            [size, 0, 0],
            [-size, 0, 0],
            [0, 0, -size],
            [0, size, 0],
            [0, -size, 0]
        ];

        var theCube = function () {
            for (var i = 0; i < 6; i++) {
                xlt = xlate[i];
                rot = rotate[i];
                
                matrix.push(Transform.multiply(
                    Transform.translate(xlt[0], xlt[1], xlt[2]),
                    Transform.rotate(rot[0]*convert, rot[1]*convert, rot[2]*convert)
                ));

                    _smod[i].setTransform(
                        matrix[i], {
                            duration: 0
                        });
            }
        }; // End of theCube

        var rotateTheCube = function () {
            for (var i = 0; i < colors.length; i++) {
                xlt = xlate[i];
                rot = rotate[i];
                matrix2 = Transform.rotate(0, rotationY * convert, rotationZ*convert );

                matrix2 = Transform.multiply(matrix2, matrix[i])

                callback = function () {
                    rotationY += 0.1;
                    rotationZ += 0.2;
                }
                _smod[i].setTransform (
                    matrix2, {
                        duration: 0
                    }, callback);
            }
        }; // End of rotateTheCube

        var _ctx = Engine.createContext();
            _ctx.setPerspective(500);

        var colors = ['#2ecc71', '#3498db', '#f1c40f', '#c0392b', '#1abc9c', '#9b59b6'],
            _surface = [],
            _smod = [],
            rotationY = 0,
            rotationZ = 0,
            matrix2;

        for (var i = 0; i < colors.length; i++) {
            _surface[i] = new Surface({
                size: [size*2, size*2],
                properties: {
                    backgroundColor: colors[i],
                    opacity: 0.9
                }
            });
            _surface[i].addClass("backface");
            _smod[i] = new Modifier({
                origin: [0.5, 0.5]
            });
            _ctx.add(_smod[i]).add(_surface[i]);
        }
        theCube();
        Timer.setInterval(rotateTheCube, 20);
}); 
