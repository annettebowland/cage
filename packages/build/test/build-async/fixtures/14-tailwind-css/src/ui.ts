import '!./styles.css'

export default function (rootNode: HTMLElement, data: { greeting: string }) {
  rootNode.innerHTML = `<p class="!pt-[117px] hover:bg-[#bada55] before:content-['foo']">${data.greeting}</p>`
}
