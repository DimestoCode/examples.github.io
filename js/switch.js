let off = document.getElementById('off');
let on = document.getElementById('on');
let radio = document.querySelector('.radio');

off.addEventListener('click', () => {
    radio.classList.add('off');
});

on.addEventListener('click', () => {
    radio.classList.remove('off');
});

let checkbox = document.querySelector('.checkbox');
let checkboxOn = document.querySelector('.checkbox .on');
let checkboxOff = document.querySelector('.checkbox .off');
let checkboxLabel = document.querySelector('.checkbox label');
let trigger = true;

anime({ 
    targets: checkboxOn, 
    translateX: '0',
    zIndex: {
        value: [1, 2],
        round: true
        },
    duration: 0
})

anime({ 
    targets: checkboxOff, 
    translateX: '-100%',
    zIndex: {
        value: [2, 1],
        round: true
        },
    duration: 0
})

checkboxLabel.addEventListener('click', () => {
    if (trigger) {
        checkbox.classList.toggle('active');
        trigger = false;

        if (checkbox.classList.contains('active')) {
            checkbox.setAttribute('checked', false);

            anime({
                targets: checkboxOff,
                zIndex: {
                    value: [1, 2],
                    round: true
                },
                duration: 0
            })
            anime({
                targets: checkboxOn,
                zIndex: {
                    value: [2, 1],
                    round: true
                },
                duration: 0
            })

            anime({
                targets: checkboxOff,
                translateX: '0%',
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                    anime({
                        targets: checkboxOn,
                        translateX: '100%',
                        duration: 0
                    });
                    trigger = true;
                }
            })
        } else {
            checkbox.setAttribute('checked', true);

            anime({
                targets: checkboxOn,
                zIndex: {
                    value: [1, 2],
                    round: true
                },
                duration: 0
            })
            anime({
                targets: checkboxOff,
                zIndex: {
                    value: [2, 1],
                    round: true
                },
                duration: 0
            })

            anime({
                targets: checkboxOn,
                translateX: '0%',
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                    anime({
                        targets: checkboxOff,
                        translateX: '-100%',
                        duration: 0
                    });
                    trigger = true;
                }
            })
        }
    }
});


let switcher = document.querySelector('.switcher');
let switcherLabel = document.querySelector('.switcher label');
let switcherLeft = document.querySelector('.switcher .left');
let switcherRight = document.querySelector('.switcher .right');
let zindex = 2;
let t = true;

switcherLabel.addEventListener('click', () => {
    if (t) {
        t = false;

        switcher.classList.toggle('active');
        zindex++;

        if (switcher.classList.contains('active')) {
            anime({
                targets: switcherLeft,
                scale: 12,
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                    anime({
                        targets: switcherRight,
                        scale: 0,
                        zIndex: {
                            value: [zindex, zindex++],
                            round: true
                        },
                        duration: 0
                    });

                    anime({
                        targets: switcherRight,
                        scale: 1,
                        duration: 700,
                        complete: () => {
                            t = true;
                        }
                    });
                }
            })
        } else {
            anime({
                targets: switcherRight,
                scale: 12,
                duration: 500,
                easing: 'easeInOutQuad',
                complete: () => {
                    anime({
                        targets: switcherLeft,
                        scale: 0,
                        zIndex: {
                            value: [zindex, zindex++],
                            round: true
                        },
                        duration: 0
                    });

                    anime({
                        targets: switcherLeft,
                        scale: 1,
                        duration: 700,
                        complete: () => {
                            t = true;
                        }
                    });
                }
            })
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzd2l0Y2guanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IG9mZiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZmYnKTtcbmxldCBvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvbicpO1xubGV0IHJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhZGlvJyk7XG5cbm9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByYWRpby5jbGFzc0xpc3QuYWRkKCdvZmYnKTtcbn0pO1xuXG5vbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICByYWRpby5jbGFzc0xpc3QucmVtb3ZlKCdvZmYnKTtcbn0pO1xuXG5sZXQgY2hlY2tib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hlY2tib3gnKTtcbmxldCBjaGVja2JveE9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoZWNrYm94IC5vbicpO1xubGV0IGNoZWNrYm94T2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoZWNrYm94IC5vZmYnKTtcbmxldCBjaGVja2JveExhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoZWNrYm94IGxhYmVsJyk7XG5sZXQgdHJpZ2dlciA9IHRydWU7XG5cbmFuaW1lKHsgXG4gICAgdGFyZ2V0czogY2hlY2tib3hPbiwgXG4gICAgdHJhbnNsYXRlWDogJzAnLFxuICAgIHpJbmRleDoge1xuICAgICAgICB2YWx1ZTogWzEsIDJdLFxuICAgICAgICByb3VuZDogdHJ1ZVxuICAgICAgICB9LFxuICAgIGR1cmF0aW9uOiAwXG59KVxuXG5hbmltZSh7IFxuICAgIHRhcmdldHM6IGNoZWNrYm94T2ZmLCBcbiAgICB0cmFuc2xhdGVYOiAnLTEwMCUnLFxuICAgIHpJbmRleDoge1xuICAgICAgICB2YWx1ZTogWzIsIDFdLFxuICAgICAgICByb3VuZDogdHJ1ZVxuICAgICAgICB9LFxuICAgIGR1cmF0aW9uOiAwXG59KVxuXG5jaGVja2JveExhYmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICAgIGNoZWNrYm94LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICB0cmlnZ2VyID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGNoZWNrYm94LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIGZhbHNlKTtcblxuICAgICAgICAgICAgYW5pbWUoe1xuICAgICAgICAgICAgICAgIHRhcmdldHM6IGNoZWNrYm94T2ZmLFxuICAgICAgICAgICAgICAgIHpJbmRleDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogWzEsIDJdLFxuICAgICAgICAgICAgICAgICAgICByb3VuZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBhbmltZSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0czogY2hlY2tib3hPbixcbiAgICAgICAgICAgICAgICB6SW5kZXg6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFsyLCAxXSxcbiAgICAgICAgICAgICAgICAgICAgcm91bmQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBhbmltZSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0czogY2hlY2tib3hPZmYsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWDogJzAlJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2Vhc2VJbk91dFF1YWQnLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1lKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldHM6IGNoZWNrYm94T24sXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpO1xuXG4gICAgICAgICAgICBhbmltZSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0czogY2hlY2tib3hPbixcbiAgICAgICAgICAgICAgICB6SW5kZXg6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFsxLCAyXSxcbiAgICAgICAgICAgICAgICAgICAgcm91bmQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYW5pbWUoe1xuICAgICAgICAgICAgICAgIHRhcmdldHM6IGNoZWNrYm94T2ZmLFxuICAgICAgICAgICAgICAgIHpJbmRleDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogWzIsIDFdLFxuICAgICAgICAgICAgICAgICAgICByb3VuZDogdHJ1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDBcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGFuaW1lKHtcbiAgICAgICAgICAgICAgICB0YXJnZXRzOiBjaGVja2JveE9uLFxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVg6ICcwJScsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgICAgICAgICAgICBlYXNpbmc6ICdlYXNlSW5PdXRRdWFkJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbmltZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBjaGVja2JveE9mZixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVg6ICctMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbmxldCBzd2l0Y2hlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zd2l0Y2hlcicpO1xubGV0IHN3aXRjaGVyTGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3dpdGNoZXIgbGFiZWwnKTtcbmxldCBzd2l0Y2hlckxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3dpdGNoZXIgLmxlZnQnKTtcbmxldCBzd2l0Y2hlclJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN3aXRjaGVyIC5yaWdodCcpO1xubGV0IHppbmRleCA9IDI7XG5sZXQgdCA9IHRydWU7XG5cbnN3aXRjaGVyTGFiZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKHQpIHtcbiAgICAgICAgdCA9IGZhbHNlO1xuXG4gICAgICAgIHN3aXRjaGVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICB6aW5kZXgrKztcblxuICAgICAgICBpZiAoc3dpdGNoZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgYW5pbWUoe1xuICAgICAgICAgICAgICAgIHRhcmdldHM6IHN3aXRjaGVyTGVmdCxcbiAgICAgICAgICAgICAgICBzY2FsZTogMTIsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgICAgICAgICAgICBlYXNpbmc6ICdlYXNlSW5PdXRRdWFkJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbmltZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBzd2l0Y2hlclJpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogW3ppbmRleCwgemluZGV4KytdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgYW5pbWUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0czogc3dpdGNoZXJSaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDcwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmltZSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0czogc3dpdGNoZXJSaWdodCxcbiAgICAgICAgICAgICAgICBzY2FsZTogMTIsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDUwMCxcbiAgICAgICAgICAgICAgICBlYXNpbmc6ICdlYXNlSW5PdXRRdWFkJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhbmltZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBzd2l0Y2hlckxlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBbemluZGV4LCB6aW5kZXgrK10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91bmQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBhbmltZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBzd2l0Y2hlckxlZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA3MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwiZmlsZSI6InN3aXRjaC5qcyJ9
