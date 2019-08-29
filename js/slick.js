/*!
* slick.js
* v1.0.1 - 2013-12-20
* https://github.com/shashankmehta/slick.js
* (c) Shashank Mehta; MIT License
*/
/*global jQuery */
(function ($, root) {
    'use strict';

    $.fn.exists = function () {
        return this.length !== 0;
    };

    var Slick = function (container, config) {
        this.options = {
            source: undefined,
            start: undefined,
            end: undefined,
            keyControl: true,
            content: undefined,
            theme: {
                container: container,
                content: '.slick-content',
                currentNo: '.current-no',
                totalNo: '.total',
                next: '.next',
                prev: '.prev',
            }
        };

        for (var option in this.options) {
            if (this.options.hasOwnProperty(option) && option !== 'theme') {
                this.options[option] = config[option] !== undefined ? config[option] : this.options[option];
            }
        }

        if(config.theme !== undefined){
            for (var val in this.options.theme) {
                if (this.options.theme.hasOwnProperty(val)) {
                    this.options.theme[val] = config.theme[val] !== undefined ? config.theme[val] : this.options.theme[val];
                }
            }
        }

        this.options.content = this.options.theme.container + ' ' + this.options.theme.content;

        this.state = {
            // Stores slide url no that is visible
            current: this.options.start-1,
            
            start: this.options.start,
            end: this.options.end,

            // Stores values that is shown in controls
            slide: {
                current: 0,
                difference: (this.options.start - 1),
                total: (this.options.end - this.options.start + 1),
                maxHit: 0
            }
        };
        
        this.init.apply(this);
    };

    var SlickProto = Slick.prototype;

    SlickProto.hooks = {

        // Main function for handling next/forwarding of slides
        next: function() {
            var slick = this;

            if(slick.state.slide.current < slick.state.slide.total){
                var step = ++slick.state.slide.current + slick.state.slide.difference;
                slick.hooks.setSlide.apply(this, [step]);
            }
        },

        // Main function for handling going backward
        prev: function(){
            var slick = this;

            if(slick.state.slide.current > 1){
                var step = --slick.state.slide.current + slick.state.slide.difference;
                slick.hooks.setSlide.apply(this, [step]);
            }
        },

        setSlide: function(step){
            var slick = this;
            var slideStatus = slick.hooks.slideStatus.apply(slick, [step]);
            slick.state.slide.current = step - slick.state.slide.difference;

            if(slick.state.slide.current === 1){
                $(slick.options.theme.container).animate({'opacity': '1'}, 500);
            }

            if($(slick.options.theme.container + ' .skip' + slick.options.theme.currentNo).is(':input')){
                $(slick.options.theme.container + ' ' + slick.options.theme.currentNo).val(slick.state.slide.current);
            }
            else {
                $(slick.options.theme.container + ' .skip').val(slick.state.slide.current);
                $(slick.options.theme.container + ' ' + slick.options.theme.currentNo).html(slick.state.slide.current);
            }

            
            if(slideStatus === 1){
                $(slick.options.content + ' img.current').removeClass('current').addClass('cached-slide').hide();
                $(slick.options.content + ' img[data-slide=' + step + ']').removeClass('cached-slide').addClass('current').show();
                slick.state.current = step;
                $(slick.options.theme.container + ' .length').width(100 * slick.state.slide.current / slick.state.slide.total + '%');
                slick.hooks.getSlide.apply(slick, [step+1]);
                return;
            }
            else if(slideStatus === 2){
                slick.hooks.slideSwitch.apply(this, [step]);
            }
            else if(slideStatus === 0){
                // Removing on load from all previous still loading images 
                $(slick.options.content + ' img.loading').off('load.slideSwitch').remove();
                slick.hooks.getSlide.apply(slick, [step]);
                slick.hooks.slideSwitch.apply(this, [step]);
            }
        },

        // Gets the slide for the step
        getSlide: function(step){
            var slick = this;
            if(slick.hooks.slideStatus.apply(this, [step]) === 0 && step <= slick.state.end){
                $(slick.options.content).append('<img src="'+ slick.hooks.imagePath.apply(slick, [step]) +'" data-slide=' + step + ' class="loading">');
                $(slick.options.content + ' img.loading').hide();
                $(slick.options.content + ' img.loading').load(function(){
                    $(this).removeClass('loading').addClass('cached-slide');
                });
            }
        },

        slideSwitch: function(step){
            var slick = this;
            $(slick.options.content + ' img[data-slide=' + step + ']').on('load.slideSwitch', function(){
                $(slick.options.content + ' img.current').removeClass('current').addClass('cached-slide').hide();
                $(this).removeClass('cached-slide').addClass('current').show();
                slick.state.current = step;
                $(slick.options.theme.container + ' .length').width(100 * (step + 1) / slick.state.slide.total + '%');
                slick.hooks.getSlide.apply(slick, [step+1]);
            });
        },

        // Returns the status of a slide
        // 0: Not requested yet
        // 1: cached
        // 2: loading
        slideStatus: function(step){
            var slick = this;
            var el = slick.options.content + ' img[data-slide=' + step + ']';
            if($(el).exists()){
                if($(el).hasClass('loading')){
                    return 2;
                }
                else {
                    return 1;
                }
            }
            else {
                return 0;
            }
        },

        // Returns the path with the current no inserted
        imagePath: function(step){
            var parts = this.options.source.split('*');
            return parts[0] + step + parts[1];
        },

        skip: function(val){
            if($.isNumeric(val)){
                var slick = this;

                var step = parseInt(val) + slick.state.slide.difference;
                slick.hooks.getSlide.apply(slick, [step]);
                slick.hooks.setSlide.apply(slick, [step]);
            }
        }

    };

    SlickProto.init = function(){
        var slick = this;

        $(slick.options.theme.container).css('opacity', '0');

        // Sets the first slide
        if(typeof slick.options.source === 'string'){
            slick.hooks.next.apply(slick);
        }

        // Attaches event listeners for next/prev buttons
        $(slick.options.theme.container + ' ' + slick.options.theme.next).click(function(e){
            e.preventDefault();
            slick.hooks.next.apply(slick);
        });
        $(slick.options.theme.container + ' ' + slick.options.theme.prev).click(function(e){
            e.preventDefault();
            slick.hooks.prev.apply(slick);
        });
        $(slick.options.theme.container + ' ' + slick.options.theme.totalNo).html(slick.state.end - slick.state.start + 1);

        // Ataches keyboard control
        if(slick.options.keyControl){
            $(document).keyup(function(e) {
                if ((e.keyCode ===  39) && !$('input:focus').exists()) {
                    slick.hooks.next.apply(slick);
                }
                if ((e.keyCode ===  37) && !$('input:focus').exists()) {
                    slick.hooks.prev.apply(slick);
                }
            });
        }
        
        $(slick.options.theme.container + ' .skip').keypress(function(e){
            if(e.keyCode === 13){
                slick.hooks.skip.apply(slick, [$(this).val()]);
                $(this).blur();
            }
        });
    };

    window.Slick = Slick;

    // Exposing programmatic access
    Slick.next = function(slick){
        if(slick.constructor === Slick){
            slick.hooks.next.apply(slick);
        }
    };

    Slick.prev = function(slick){
        if(slick.constructor === Slick){
            slick.hooks.prev.apply(slick);
        }
    };

    Slick.skip = function(slick, step){
        if(slick.constructor === Slick){
            slick.hooks.skip.apply(slick, [step]);
        }
    };

}(jQuery, window));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzbGljay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiogc2xpY2suanNcbiogdjEuMC4xIC0gMjAxMy0xMi0yMFxuKiBodHRwczovL2dpdGh1Yi5jb20vc2hhc2hhbmttZWh0YS9zbGljay5qc1xuKiAoYykgU2hhc2hhbmsgTWVodGE7IE1JVCBMaWNlbnNlXG4qL1xuLypnbG9iYWwgalF1ZXJ5ICovXG4oZnVuY3Rpb24gKCQsIHJvb3QpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAkLmZuLmV4aXN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoICE9PSAwO1xuICAgIH07XG5cbiAgICB2YXIgU2xpY2sgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBjb25maWcpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgc291cmNlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdGFydDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZW5kOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBrZXlDb250cm9sOiB0cnVlLFxuICAgICAgICAgICAgY29udGVudDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdGhlbWU6IHtcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnLnNsaWNrLWNvbnRlbnQnLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRObzogJy5jdXJyZW50LW5vJyxcbiAgICAgICAgICAgICAgICB0b3RhbE5vOiAnLnRvdGFsJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAnLm5leHQnLFxuICAgICAgICAgICAgICAgIHByZXY6ICcucHJldicsXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yICh2YXIgb3B0aW9uIGluIHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvcHRpb24pICYmIG9wdGlvbiAhPT0gJ3RoZW1lJykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gY29uZmlnW29wdGlvbl0gIT09IHVuZGVmaW5lZCA/IGNvbmZpZ1tvcHRpb25dIDogdGhpcy5vcHRpb25zW29wdGlvbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihjb25maWcudGhlbWUgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBmb3IgKHZhciB2YWwgaW4gdGhpcy5vcHRpb25zLnRoZW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50aGVtZS5oYXNPd25Qcm9wZXJ0eSh2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy50aGVtZVt2YWxdID0gY29uZmlnLnRoZW1lW3ZhbF0gIT09IHVuZGVmaW5lZCA/IGNvbmZpZy50aGVtZVt2YWxdIDogdGhpcy5vcHRpb25zLnRoZW1lW3ZhbF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vcHRpb25zLmNvbnRlbnQgPSB0aGlzLm9wdGlvbnMudGhlbWUuY29udGFpbmVyICsgJyAnICsgdGhpcy5vcHRpb25zLnRoZW1lLmNvbnRlbnQ7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIC8vIFN0b3JlcyBzbGlkZSB1cmwgbm8gdGhhdCBpcyB2aXNpYmxlXG4gICAgICAgICAgICBjdXJyZW50OiB0aGlzLm9wdGlvbnMuc3RhcnQtMSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc3RhcnQ6IHRoaXMub3B0aW9ucy5zdGFydCxcbiAgICAgICAgICAgIGVuZDogdGhpcy5vcHRpb25zLmVuZCxcblxuICAgICAgICAgICAgLy8gU3RvcmVzIHZhbHVlcyB0aGF0IGlzIHNob3duIGluIGNvbnRyb2xzXG4gICAgICAgICAgICBzbGlkZToge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICAgICAgICAgICAgZGlmZmVyZW5jZTogKHRoaXMub3B0aW9ucy5zdGFydCAtIDEpLFxuICAgICAgICAgICAgICAgIHRvdGFsOiAodGhpcy5vcHRpb25zLmVuZCAtIHRoaXMub3B0aW9ucy5zdGFydCArIDEpLFxuICAgICAgICAgICAgICAgIG1heEhpdDogMFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0LmFwcGx5KHRoaXMpO1xuICAgIH07XG5cbiAgICB2YXIgU2xpY2tQcm90byA9IFNsaWNrLnByb3RvdHlwZTtcblxuICAgIFNsaWNrUHJvdG8uaG9va3MgPSB7XG5cbiAgICAgICAgLy8gTWFpbiBmdW5jdGlvbiBmb3IgaGFuZGxpbmcgbmV4dC9mb3J3YXJkaW5nIG9mIHNsaWRlc1xuICAgICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzbGljayA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmKHNsaWNrLnN0YXRlLnNsaWRlLmN1cnJlbnQgPCBzbGljay5zdGF0ZS5zbGlkZS50b3RhbCl7XG4gICAgICAgICAgICAgICAgdmFyIHN0ZXAgPSArK3NsaWNrLnN0YXRlLnNsaWRlLmN1cnJlbnQgKyBzbGljay5zdGF0ZS5zbGlkZS5kaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIHNsaWNrLmhvb2tzLnNldFNsaWRlLmFwcGx5KHRoaXMsIFtzdGVwXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gTWFpbiBmdW5jdGlvbiBmb3IgaGFuZGxpbmcgZ29pbmcgYmFja3dhcmRcbiAgICAgICAgcHJldjogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBzbGljayA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmKHNsaWNrLnN0YXRlLnNsaWRlLmN1cnJlbnQgPiAxKXtcbiAgICAgICAgICAgICAgICB2YXIgc3RlcCA9IC0tc2xpY2suc3RhdGUuc2xpZGUuY3VycmVudCArIHNsaWNrLnN0YXRlLnNsaWRlLmRpZmZlcmVuY2U7XG4gICAgICAgICAgICAgICAgc2xpY2suaG9va3Muc2V0U2xpZGUuYXBwbHkodGhpcywgW3N0ZXBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzZXRTbGlkZTogZnVuY3Rpb24oc3RlcCl7XG4gICAgICAgICAgICB2YXIgc2xpY2sgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHNsaWRlU3RhdHVzID0gc2xpY2suaG9va3Muc2xpZGVTdGF0dXMuYXBwbHkoc2xpY2ssIFtzdGVwXSk7XG4gICAgICAgICAgICBzbGljay5zdGF0ZS5zbGlkZS5jdXJyZW50ID0gc3RlcCAtIHNsaWNrLnN0YXRlLnNsaWRlLmRpZmZlcmVuY2U7XG5cbiAgICAgICAgICAgIGlmKHNsaWNrLnN0YXRlLnNsaWRlLmN1cnJlbnQgPT09IDEpe1xuICAgICAgICAgICAgICAgICQoc2xpY2sub3B0aW9ucy50aGVtZS5jb250YWluZXIpLmFuaW1hdGUoeydvcGFjaXR5JzogJzEnfSwgNTAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoJChzbGljay5vcHRpb25zLnRoZW1lLmNvbnRhaW5lciArICcgLnNraXAnICsgc2xpY2sub3B0aW9ucy50aGVtZS5jdXJyZW50Tm8pLmlzKCc6aW5wdXQnKSl7XG4gICAgICAgICAgICAgICAgJChzbGljay5vcHRpb25zLnRoZW1lLmNvbnRhaW5lciArICcgJyArIHNsaWNrLm9wdGlvbnMudGhlbWUuY3VycmVudE5vKS52YWwoc2xpY2suc3RhdGUuc2xpZGUuY3VycmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKHNsaWNrLm9wdGlvbnMudGhlbWUuY29udGFpbmVyICsgJyAuc2tpcCcpLnZhbChzbGljay5zdGF0ZS5zbGlkZS5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICAkKHNsaWNrLm9wdGlvbnMudGhlbWUuY29udGFpbmVyICsgJyAnICsgc2xpY2sub3B0aW9ucy50aGVtZS5jdXJyZW50Tm8pLmh0bWwoc2xpY2suc3RhdGUuc2xpZGUuY3VycmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoc2xpZGVTdGF0dXMgPT09IDEpe1xuICAgICAgICAgICAgICAgICQoc2xpY2sub3B0aW9ucy5jb250ZW50ICsgJyBpbWcuY3VycmVudCcpLnJlbW92ZUNsYXNzKCdjdXJyZW50JykuYWRkQ2xhc3MoJ2NhY2hlZC1zbGlkZScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkKHNsaWNrLm9wdGlvbnMuY29udGVudCArICcgaW1nW2RhdGEtc2xpZGU9JyArIHN0ZXAgKyAnXScpLnJlbW92ZUNsYXNzKCdjYWNoZWQtc2xpZGUnKS5hZGRDbGFzcygnY3VycmVudCcpLnNob3coKTtcbiAgICAgICAgICAgICAgICBzbGljay5zdGF0ZS5jdXJyZW50ID0gc3RlcDtcbiAgICAgICAgICAgICAgICAkKHNsaWNrLm9wdGlvbnMudGhlbWUuY29udGFpbmVyICsgJyAubGVuZ3RoJykud2lkdGgoMTAwICogc2xpY2suc3RhdGUuc2xpZGUuY3VycmVudCAvIHNsaWNrLnN0YXRlLnNsaWRlLnRvdGFsICsgJyUnKTtcbiAgICAgICAgICAgICAgICBzbGljay5ob29rcy5nZXRTbGlkZS5hcHBseShzbGljaywgW3N0ZXArMV0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoc2xpZGVTdGF0dXMgPT09IDIpe1xuICAgICAgICAgICAgICAgIHNsaWNrLmhvb2tzLnNsaWRlU3dpdGNoLmFwcGx5KHRoaXMsIFtzdGVwXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHNsaWRlU3RhdHVzID09PSAwKXtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmluZyBvbiBsb2FkIGZyb20gYWxsIHByZXZpb3VzIHN0aWxsIGxvYWRpbmcgaW1hZ2VzIFxuICAgICAgICAgICAgICAgICQoc2xpY2sub3B0aW9ucy5jb250ZW50ICsgJyBpbWcubG9hZGluZycpLm9mZignbG9hZC5zbGlkZVN3aXRjaCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHNsaWNrLmhvb2tzLmdldFNsaWRlLmFwcGx5KHNsaWNrLCBbc3RlcF0pO1xuICAgICAgICAgICAgICAgIHNsaWNrLmhvb2tzLnNsaWRlU3dpdGNoLmFwcGx5KHRoaXMsIFtzdGVwXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gR2V0cyB0aGUgc2xpZGUgZm9yIHRoZSBzdGVwXG4gICAgICAgIGdldFNsaWRlOiBmdW5jdGlvbihzdGVwKXtcbiAgICAgICAgICAgIHZhciBzbGljayA9IHRoaXM7XG4gICAgICAgICAgICBpZihzbGljay5ob29rcy5zbGlkZVN0YXR1cy5hcHBseSh0aGlzLCBbc3RlcF0pID09PSAwICYmIHN0ZXAgPD0gc2xpY2suc3RhdGUuZW5kKXtcbiAgICAgICAgICAgICAgICAkKHNsaWNrLm9wdGlvbnMuY29udGVudCkuYXBwZW5kKCc8aW1nIHNyYz1cIicrIHNsaWNrLmhvb2tzLmltYWdlUGF0aC5hcHBseShzbGljaywgW3N0ZXBdKSArJ1wiIGRhdGEtc2xpZGU9JyArIHN0ZXAgKyAnIGNsYXNzPVwibG9hZGluZ1wiPicpO1xuICAgICAgICAgICAgICAgICQoc2xpY2sub3B0aW9ucy5jb250ZW50ICsgJyBpbWcubG9hZGluZycpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkKHNsaWNrLm9wdGlvbnMuY29udGVudCArICcgaW1nLmxvYWRpbmcnKS5sb2FkKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKS5hZGRDbGFzcygnY2FjaGVkLXNsaWRlJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2xpZGVTd2l0Y2g6IGZ1bmN0aW9uKHN0ZXApe1xuICAgICAgICAgICAgdmFyIHNsaWNrID0gdGhpcztcbiAgICAgICAgICAgICQoc2xpY2sub3B0aW9ucy5jb250ZW50ICsgJyBpbWdbZGF0YS1zbGlkZT0nICsgc3RlcCArICddJykub24oJ2xvYWQuc2xpZGVTd2l0Y2gnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoc2xpY2sub3B0aW9ucy5jb250ZW50ICsgJyBpbWcuY3VycmVudCcpLnJlbW92ZUNsYXNzKCdjdXJyZW50JykuYWRkQ2xhc3MoJ2NhY2hlZC1zbGlkZScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdjYWNoZWQtc2xpZGUnKS5hZGRDbGFzcygnY3VycmVudCcpLnNob3coKTtcbiAgICAgICAgICAgICAgICBzbGljay5zdGF0ZS5jdXJyZW50ID0gc3RlcDtcbiAgICAgICAgICAgICAgICAkKHNsaWNrLm9wdGlvbnMudGhlbWUuY29udGFpbmVyICsgJyAubGVuZ3RoJykud2lkdGgoMTAwICogKHN0ZXAgKyAxKSAvIHNsaWNrLnN0YXRlLnNsaWRlLnRvdGFsICsgJyUnKTtcbiAgICAgICAgICAgICAgICBzbGljay5ob29rcy5nZXRTbGlkZS5hcHBseShzbGljaywgW3N0ZXArMV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUmV0dXJucyB0aGUgc3RhdHVzIG9mIGEgc2xpZGVcbiAgICAgICAgLy8gMDogTm90IHJlcXVlc3RlZCB5ZXRcbiAgICAgICAgLy8gMTogY2FjaGVkXG4gICAgICAgIC8vIDI6IGxvYWRpbmdcbiAgICAgICAgc2xpZGVTdGF0dXM6IGZ1bmN0aW9uKHN0ZXApe1xuICAgICAgICAgICAgdmFyIHNsaWNrID0gdGhpcztcbiAgICAgICAgICAgIHZhciBlbCA9IHNsaWNrLm9wdGlvbnMuY29udGVudCArICcgaW1nW2RhdGEtc2xpZGU9JyArIHN0ZXAgKyAnXSc7XG4gICAgICAgICAgICBpZigkKGVsKS5leGlzdHMoKSl7XG4gICAgICAgICAgICAgICAgaWYoJChlbCkuaGFzQ2xhc3MoJ2xvYWRpbmcnKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gUmV0dXJucyB0aGUgcGF0aCB3aXRoIHRoZSBjdXJyZW50IG5vIGluc2VydGVkXG4gICAgICAgIGltYWdlUGF0aDogZnVuY3Rpb24oc3RlcCl7XG4gICAgICAgICAgICB2YXIgcGFydHMgPSB0aGlzLm9wdGlvbnMuc291cmNlLnNwbGl0KCcqJyk7XG4gICAgICAgICAgICByZXR1cm4gcGFydHNbMF0gKyBzdGVwICsgcGFydHNbMV07XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2tpcDogZnVuY3Rpb24odmFsKXtcbiAgICAgICAgICAgIGlmKCQuaXNOdW1lcmljKHZhbCkpe1xuICAgICAgICAgICAgICAgIHZhciBzbGljayA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RlcCA9IHBhcnNlSW50KHZhbCkgKyBzbGljay5zdGF0ZS5zbGlkZS5kaWZmZXJlbmNlO1xuICAgICAgICAgICAgICAgIHNsaWNrLmhvb2tzLmdldFNsaWRlLmFwcGx5KHNsaWNrLCBbc3RlcF0pO1xuICAgICAgICAgICAgICAgIHNsaWNrLmhvb2tzLnNldFNsaWRlLmFwcGx5KHNsaWNrLCBbc3RlcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2tQcm90by5pbml0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHNsaWNrID0gdGhpcztcblxuICAgICAgICAkKHNsaWNrLm9wdGlvbnMudGhlbWUuY29udGFpbmVyKS5jc3MoJ29wYWNpdHknLCAnMCcpO1xuXG4gICAgICAgIC8vIFNldHMgdGhlIGZpcnN0IHNsaWRlXG4gICAgICAgIGlmKHR5cGVvZiBzbGljay5vcHRpb25zLnNvdXJjZSA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgc2xpY2suaG9va3MubmV4dC5hcHBseShzbGljayk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdHRhY2hlcyBldmVudCBsaXN0ZW5lcnMgZm9yIG5leHQvcHJldiBidXR0b25zXG4gICAgICAgICQoc2xpY2sub3B0aW9ucy50aGVtZS5jb250YWluZXIgKyAnICcgKyBzbGljay5vcHRpb25zLnRoZW1lLm5leHQpLmNsaWNrKGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2xpY2suaG9va3MubmV4dC5hcHBseShzbGljayk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKHNsaWNrLm9wdGlvbnMudGhlbWUuY29udGFpbmVyICsgJyAnICsgc2xpY2sub3B0aW9ucy50aGVtZS5wcmV2KS5jbGljayhmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHNsaWNrLmhvb2tzLnByZXYuYXBwbHkoc2xpY2spO1xuICAgICAgICB9KTtcbiAgICAgICAgJChzbGljay5vcHRpb25zLnRoZW1lLmNvbnRhaW5lciArICcgJyArIHNsaWNrLm9wdGlvbnMudGhlbWUudG90YWxObykuaHRtbChzbGljay5zdGF0ZS5lbmQgLSBzbGljay5zdGF0ZS5zdGFydCArIDEpO1xuXG4gICAgICAgIC8vIEF0YWNoZXMga2V5Ym9hcmQgY29udHJvbFxuICAgICAgICBpZihzbGljay5vcHRpb25zLmtleUNvbnRyb2wpe1xuICAgICAgICAgICAgJChkb2N1bWVudCkua2V5dXAoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGlmICgoZS5rZXlDb2RlID09PSAgMzkpICYmICEkKCdpbnB1dDpmb2N1cycpLmV4aXN0cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWNrLmhvb2tzLm5leHQuYXBwbHkoc2xpY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKGUua2V5Q29kZSA9PT0gIDM3KSAmJiAhJCgnaW5wdXQ6Zm9jdXMnKS5leGlzdHMoKSkge1xuICAgICAgICAgICAgICAgICAgICBzbGljay5ob29rcy5wcmV2LmFwcGx5KHNsaWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJChzbGljay5vcHRpb25zLnRoZW1lLmNvbnRhaW5lciArICcgLnNraXAnKS5rZXlwcmVzcyhmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMTMpe1xuICAgICAgICAgICAgICAgIHNsaWNrLmhvb2tzLnNraXAuYXBwbHkoc2xpY2ssIFskKHRoaXMpLnZhbCgpXSk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB3aW5kb3cuU2xpY2sgPSBTbGljaztcblxuICAgIC8vIEV4cG9zaW5nIHByb2dyYW1tYXRpYyBhY2Nlc3NcbiAgICBTbGljay5uZXh0ID0gZnVuY3Rpb24oc2xpY2spe1xuICAgICAgICBpZihzbGljay5jb25zdHJ1Y3RvciA9PT0gU2xpY2spe1xuICAgICAgICAgICAgc2xpY2suaG9va3MubmV4dC5hcHBseShzbGljayk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgU2xpY2sucHJldiA9IGZ1bmN0aW9uKHNsaWNrKXtcbiAgICAgICAgaWYoc2xpY2suY29uc3RydWN0b3IgPT09IFNsaWNrKXtcbiAgICAgICAgICAgIHNsaWNrLmhvb2tzLnByZXYuYXBwbHkoc2xpY2spO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNsaWNrLnNraXAgPSBmdW5jdGlvbihzbGljaywgc3RlcCl7XG4gICAgICAgIGlmKHNsaWNrLmNvbnN0cnVjdG9yID09PSBTbGljayl7XG4gICAgICAgICAgICBzbGljay5ob29rcy5za2lwLmFwcGx5KHNsaWNrLCBbc3RlcF0pO1xuICAgICAgICB9XG4gICAgfTtcblxufShqUXVlcnksIHdpbmRvdykpOyJdLCJmaWxlIjoic2xpY2suanMifQ==
