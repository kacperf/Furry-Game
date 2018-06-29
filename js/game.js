var Furry = require("./furry");
var Coin = require("./coin");

var Game = function () {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.boardIndex = function (x, y) {
        return x + (y * 10);
    };

    this.hideVisibleFurry = function() {
        document.querySelector('.furry').classList.remove('furry');
    };

    this.showFurry = function() {
        this.board[this.boardIndex(this.furry.x, this.furry.y)].classList.add('furry')
    };

    this.showCoin = function() {
        this.board[this.boardIndex(this.coin.x, this.coin.y)].classList.add('coin');
    };



    // Ruch furriego

    // 2. metoda moveFurry i warunki

    this.moveFurry = function() {
        this.hideVisibleFurry(); //dodanie metody usuwania klasy furry w metodzie ruchu; rozwiazuje problem klonowania furrych

        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x += 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x -= 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y += 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y -= 1;
        }
        // 4.wywołanie funkcji


        this.gameOver();
        this.checkCoinCollision();
        this.showFurry();

    };


    // 1.set interval i test
    this.startGame = function() {
        var self = this;     //podstawienie this pod zmienną self
        this.idSetInterval = setInterval(function () { // console.log('hura z setIntervala'); -test set interval
            //3. wstawienie metody moveFurry
            self.moveFurry()
        } ,250)

        document.addEventListener('keydown', function(event) {
            self.turnFurry(event);
        });
        this.showFurry();
        this.showCoin();

    };


    this.turnFurry = function(event) {

        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'down';
                break;
            case  39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'up';
                break;
        }

        this.gameOver();

        this.checkCoinCollision();

        //  37: lewo,
        //  38: prawo,
        //  39: góra,
        //  40: dół. //odwrócone up i down (błąð)
    };


    this.checkCoinCollision = function () {
        if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) {
            this.board[this.boardIndex(this.coin.x, this.coin.y)].classList.remove('coin'); //jesli pozycja coin i furiego jest taka sama na współżednych x i y usuń coin z tablicy 'classList.remove('coin')

            this.score +=1;
            document.querySelector('strong').innerText = this.score;
            // dodaj do wyniku jeden w elemencie strong zmieniając jego text; zawsze zwiększając o jeden w sytuacji kolizji furry i coin

            this.coin = new Coin();//wyswietl tez nowa monete; coin
            this.showCoin();;

        }
    };

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            this.board[this.boardIndex(this.coin.x, this.coin.y)].classList.remove('coin');

            this.over = document.querySelector('#over');
            this.over.classList.remove('invisible');

            this.over.innerHTML = 'KONIEC GRY!, Twój wynik to: ' + this.score + ' punkty.';


            this.hideVisibleFurry();


            // alert('KONIEC GRY!, Twój wynik to: ' + this.score + ' punkty.');

        }
    }


};




module.exports = Game;