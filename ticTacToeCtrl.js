(function() {
    angular.module('ticTacToe')
    .controller('TicTacToeCtrl', ['$scope', 'TicTacToeService', function($scope, service) {
        var rows = [];
        for (var i=0; i<3; i++) {
            var row = {},
                cells = [];
            for (var j=0; j<3; j++) {
                cells.push({position: {x: j, y: i}, value: ''});
            }
            row.cells = cells;
            rows.push(row);
        }
        $scope.rows = rows;

        $scope.cellClick = function(event) {
            if ($scope.gameOverFlag) {
                return;
            }
            var el = angular.element(event.currentTarget);
            var position = el.attr('data-position').split(',');
            var isX = $scope.isX;
            var clickedCell = $scope.rows[parseInt(position[1])].cells[parseInt(position[0])];
            if (!clickedCell.value) {

                clickedCell.value = isX ? 'O' : 'X';
                $scope.isX = !isX;
            }

            var winner = $scope.gameOver();
            if (winner) {
                alert("Player " + winner + " Wins!!");
                $scope.gameOverFlag = true;
                return;
            } else if (!$scope.tieAlerted && $scope.boardFilled()) {
                alert("It's a tie!!");
                $scope.tieAlerted = true;
            }


        };

        $scope.gameOver = function() {
            return service.strategy($scope.rows);
        };

        $scope.boardFilled = function () {
            var rows = $scope.rows;
            for (var y = 0; y < rows.length; y++) {
                var row = rows[y],
                    cells = row.cells;
                for (var x = 0; x < cells.length; x++) {
                    if (!row.cells[x].value) {
                        return false;
                    }
                }
            }
            return true;
        };
    }]);
})();
