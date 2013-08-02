// ==UserScript==
// @name       Wing's MAL auto remove watched
// @namespace  http://blog.wingao.me
// @version    0.1
// @description  enter something useful
// @include http://myanimelist.net/anime.php*
// @match      http://*/*
// @copyright  2013, wing
// ==/UserScript==


function main()
{
	var q = "//a[@title='Edit this entry']";
	var xps = document.evaluate(q, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    var a = xps.iterateNext();
	while(a)
	{
		a.parentNode.parentNode.remove();
	}
}
main()