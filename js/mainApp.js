jQuery(function($){

    /****** defining variables ******/

    var socket =io.connect();
    var $usernameForm = $('#setUsername');
    var $updateForm = $('#updateUsername');
    var $newUsername = $('#newUsername');
    var $updateStatus = $('#updateStatus');
    var $usernameError = $('#usernameError');
    var $username = $('#username');
    var $messageForm = $('#send-message');
    var $messageBox = $('#message');
    var $chat = $('#chat');
    var $chatMsg = $('#chat-msg');
    var $currentUser;

    /****** notification ******/

    var Notification = {
        Vars:{
            OriginalTitle: document.title,
            Interval: null
        },
        On: function(notification, intervalSpeed){
            var _this = this;
            _this.Vars.Interval = setInterval(function(){
                document.title = (_this.Vars.OriginalTitle == document.title)
                    ? notification
                    : _this.Vars.OriginalTitle;
            }, (intervalSpeed) ? intervalSpeed : 1000);
        },
        Off: function(){
            clearInterval(this.Vars.Interval);
            document.title = this.Vars.OriginalTitle;
        }
    };

    Notification_sub = Notification;

    /****** setting username ******/

    $usernameForm.submit(function(e){
        e.preventDefault();
        if($username.val() == ""){
            $usernameError.html('Username can not be blank');  //error if username is blank
        } else{
            socket.emit('new user',$username.val(),function(data){
                if(data){
                    $('#usernameWrap').hide(); //hide username form
                    $('#chatWrapper').show(); //show chat window
                    $('#updateUsername').show(); //show chat settings when user signs in
                } else{
                    $usernameError.html('Username is already Taken!'); //error when username is taken
                }
            });
            $currentUser = $username.val();
            $username.val('');
        }
    });

    /****** changing username ******/

    $updateForm.submit(function(e){
        e.preventDefault();
        if($newUsername.val() == ""){
            $updateStatus.html('Username can not be blank').css('color','red').show(0).delay(3000).hide(0); //error when username is blank
        } else{
            socket.emit('update user',$newUsername.val(),function(data){
                if(data){
                    $updateStatus.html('Username changed!').css('color','green').show(0).delay(3000).hide(0); //username changed
                } else{
                    $updateStatus.html('Username is already Taken!').css('color','red').show(0).delay(3000).hide(0); //error when username is taken
                }
            });
            $currentUser = $newUsername.val();
            $newUsername.val('');
        }
    });

    /****** sending and receiving messages ******/

    $messageForm.submit(function(e){
        e.preventDefault();
        if($messageBox.val()==""){
            //blank message will not be sent
        } else{
            socket.emit('send message',$messageBox.val());
            $messageBox.val('');
        }
    });

    socket.on('new message',function(data){
        if(data.username === $currentUser){
            data.colorClass = "sent"; //right aligning sent messages
        } else{
            data.colorClass = "received"; // left aligning received messages
            $(window).blur(function() {
                Notification_sub.On("You have received a new message!"); // generate notification if not active
            });
        }
        $chat.append('<li class="' + data.colorClass + '"><b><span>' + data.username + '</span></b></br>' + data.message + "<br/></li>");
        window.scrollTo(0,document.body.scrollHeight); // keep scrolling downwards on receiving new messages

    });

    $(window).focus(function() {
        Notification_sub.Off(); // close notification once user reader reads the message
    });

    /****** slider ******/

    $.mobile.loading().hide(); // removing loading text generated by jQuery mobile
    var $slider = $('#img-slider');

    $('.carousel').carousel({
        interval: false // prevents auto slide
    });

    $('.left.carousel-control').hide(); // hides left slide button for first slide initially

    $slider.bind('slid.bs.carousel', function (e)
    {
        var $this = $(this);
        $this.children('.carousel-control').show();

        if ($('.carousel-inner .item:last').hasClass('active'))
        {
            $('#img-slider').carousel('pause');
            $this.children('.right.carousel-control').hide(); // hides right slide button on last slide
        } else if ($('.carousel-inner .item:first').hasClass('active'))
        {
            $this.children('.left.carousel-control').hide(); // hides left slide button on first slide
        }

    }).on( "swipeleft", function(){ // show next image on swipe left
        if($('.carousel-inner .item:last').hasClass('active')){
            $('#img-slider').carousel('pause');
        } else{
            $('#img-slider').carousel('next');
        }

    }).on( "swiperight", function(){ // show prev image on swipe right
        if($('.carousel-inner .item:first').hasClass('active')){
            $('#img-slider').carousel('pause');
        } else{
            $('#img-slider').carousel('prev');
        }
    });

    /****** settings ******/

    var $width = $('#width');
    var $height = $('#height');

    $width.slider({
        value:1120, //default width of carousel
        min: 100,
        max: 1200,
        step: 20,
        rangeDrag: true,
        slide: widthChange
    });

    //change width of carousel on slide
    function widthChange(event,slider){
        $slider.css('width',slider.value + 'px');
        $('#widVal').text(slider.value + 'px');
    }

    $height.slider({
        value:560, // default height of carousel
        min: 100,
        max: 1200,
        step: 20,
        slide: heightChange
    });

    //change height of carousel slide
    function heightChange(event,slider){
        $slider.css('height',slider.value + 'px');
        $('#higVal').text(slider.value + 'px');
    }
});