const MOVE_DURATION = 2000
const FADE_DURATION = 1000
const TOTAL_DURATION = MOVE_DURATION + FADE_DURATION

let previousSlideIndex = 0

function loop () {
  animation()

  setTimeout(loop, TOTAL_DURATION)
}

function animation () {
  $(`[data-slide="${previousSlideIndex}"] img`).animate(
    { left: '-7%' },
    MOVE_DURATION,
    function () { nextSlide() }
  )
}

function nextSlide () {
  let newIndex = findIndex()

  $('.slide').each(function () {
    let currentIndex = $(this).data('slide')

    if (compareIndexes(currentIndex, previousSlideIndex)) {
      blockWithIndex($(this), 3)
    } else {
      $(this).children('img:first').css({ left: '-10%' })
      blockWithIndex($(this), 1)
    }

    if (compareIndexes(currentIndex, newIndex)) { blockWithIndex($(this), 2) }
  })

  $(`[data-slide="${previousSlideIndex}"]`)
    .fadeOut(FADE_DURATION)

  previousSlideIndex = newIndex
}

function findIndex () {
  let newIndex = previousSlideIndex + 1
  let maxSlideDuration = $('.slide').length - 1

  return (newIndex > maxSlideDuration) ? 0 : newIndex
}

function blockWithIndex (element, index) {
  element.css('z-index', index).css('display', 'block')
}

function compareIndexes (current, previous) { return (current === previous) }
