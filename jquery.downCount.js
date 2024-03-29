/**
 * downCount: Simple Countdown clock with offset
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function ($) {

    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
                date: null,
                offset: null
            }, options);

        // Throw error if date is not set
        if (!settings.date) {
            $.error('Date is not defined.');
        }

        // Throw error if date is set incorectly
        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
        }

        // Save container
        var container = this;

        /**
         * Change client's local date to match offset timezone
         * @return {Object} Fixed Date object.
         */
        var currentDate = function () {
            // get client's current date
            var date = new Date();

            // turn date to utc
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

            // set new Date object
            var new_date = new Date(utc + (3600000*settings.offset))

            return new_date;
        };

        /**
         * Main downCount function that calculates everything
         */
        function countdown () {
            var target_date = new Date("12/15/2019"), // set target date
                current_date = currentDate(); // get fixed current date

            // difference of dates
            var difference = target_date - current_date;

            // if difference is negative than it's pass the target date
            if (difference < 0) {
                // stop timer
                clearInterval(interval);

                if (callback && typeof callback === 'function') callback();

                return;
            }

            // basic math variables
            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            // calculate dates

            var e = new Date("Dec 15 2019 10:30:00 GMT+0530"),
            t = new Date,
            r = Math.floor((e.getTime() - t.getTime()) / 1e3),
            n = fixIntegers(r % 60);
            r = Math.floor(r / 60);
            var a = fixIntegers(r % 60);
            r = Math.floor(r / 60);
            var o = fixIntegers(r % 24);
            r = Math.floor(r / 24);
            var f = r;
            $("#seconds").text(n), $("#minutes").text(a), $("#hours").text(o), $("#days").text(f)
            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);

                // fix dates so that it will show two digets
                days = (String(days).length >= 2) ? days : '0' + days;
                hours = (String(hours).length >= 2) ? hours : '0' + hours;
                minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

            // based on the date change the refrence wording
            var ref_days = (days === 1) ? 'day' : 'days',
                ref_hours = (hours === 1) ? 'hour' : 'hours',
                ref_minutes = (minutes === 1) ? 'minute' : 'minutes',
                ref_seconds = (seconds === 1) ? 'second' : 'seconds';

            // set to DOM
            container.find('.days').text(f);
            container.find('.hours').text(o);
            container.find('.minutes').text(a);
            container.find('.seconds').text(n);

            container.find('.days_ref').text(ref_days);
            container.find('.hours_ref').text(ref_hours);
            container.find('.minutes_ref').text(ref_minutes);
            container.find('.seconds_ref').text(ref_seconds);
        };
        
        // start
        var interval = setInterval(countdown, 1000);
    };

})(jQuery);

function fixIntegers(e) {
    return 0 > e && (e = 0), 10 > e ? "0" + e : "" + e
}

function e() {
    var e = new Date;
        e.setDate(e.getDate() + 25);
    var dd = e.getDate();
    var mm = e.getMonth() + 1;
    var y = e.getFullYear();
    var futureFormattedDate = mm + "/" + dd + "/" + y + ' 12:00:00';
    return futureFormattedDate;
}

$('.countdown-item').downCount({
    date: e(),
    offset: 16
});