angular.module('arb.templates.cache', ['scripts/common/app/container.tpl.html', 'scripts/common/app/footer.tpl.html', 'scripts/common/app/layouts/default.tpl.html', 'scripts/common/app/navbar.tpl.html', 'scripts/modules/article/article.layout.tpl.html', 'scripts/modules/article/create.tpl.html', 'scripts/modules/article/edit.tpl.html', 'scripts/modules/article/list.tpl.html', 'scripts/modules/article/view.tpl.html']);

angular.module("scripts/common/app/container.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("scripts/common/app/container.tpl.html",
    "<h1>{{name}}</h1>\n" +
    "\n" +
    "<pre>{{Notifications|json}}</pre>\n" +
    "<div class=\"container\" style=\"margin-top:60px\"></div>\n" +
    "");
}]);

angular.module("scripts/common/app/footer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("scripts/common/app/footer.tpl.html",
    "<div>i am a footer</div>\n" +
    "");
}]);

angular.module("scripts/common/app/layouts/default.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("scripts/common/app/layouts/default.tpl.html",
    "<div ui-view=\"header\" class=\"container\">header</div>\n" +
    "<div ui-view=\"container\" class=\"container\">container</div>\n" +
    "<div ui-view=\"footer\" class=\"container\">footer</div>\n" +
    "");
}]);

angular.module("scripts/common/app/navbar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("scripts/common/app/navbar.tpl.html",
    "<div class=\"navbar navbar-default navbar-fixed-top\">\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a class=\"navbar-brand\" href=\"#/\" ng-bind=\"appName\"></a>\n" +
    "    </div>\n" +
    "    <div class=\"navbar-collapse collapse\">\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li class=\"active\"><a ui-sref=\"home\">Home</a></li>\n" +
    "        <li><a ui-sref=\"article\">Article</a></li>\n" +
    "        <li><a href=\"\">About</a></li>\n" +
    "      </ul>\n" +
    "      <ul class=\"nav navbar-nav navbar-right\" ng-switch=\"Auth.isLoggedIn()\">\n" +
    "        <li class=\"dropdown\" ng-switch-when=\"true\">\n" +
    "          <a href=\"\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">{{Page.get('currentUser').username}} <b class=\"caret\"></b></a>\n" +
    "          <ul class=\"dropdown-menu\">\n" +
    "            <li><a ui-sref=\"logout\">Logout</a></li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "        <li ng-switch-default>\n" +
    "          <a ui-sref=\"login\">Login</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("scripts/modules/article/article.layout.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("scripts/modules/article/article.layout.tpl.html",
    "<div ui-view=\"left\" class=\"container\">Left</div>\n" +
    "<div ui-view=\"center\" class=\"container\">center</div>\n" +
    "<div ui-view=\"right\" class=\"container\">Right</div>\n" +
    "");
}]);

angular.module("scripts/modules/article/create.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("scripts/modules/article/create.tpl.html",
    "<section>\n" +
    "  <form class=\"form-horizontal\" ng-submit=\"article.create()\" role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label class=\"control-label\" for=\"title\">Title</label>\n" +
    "      <div class=\"controls\">\n" +
    "        <input type=\"text\" ng-model=\"title\" class=\"form-control\" placeholder=\"Title\" required>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label class=\"control-label\" for=\"content\">Content</label>\n" +
    "      <div class=\"controls\">\n" +
    "        <textarea ng-model=\"content\" class=\"form-control\" cols=\"30\" rows=\"10\" placeholder=\"Content\"></textarea>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"controls\">\n" +
    "        <input type=\"submit\" class=\"btn\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</section>");
}]);

angular.module("scripts/modules/article/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("scripts/modules/article/edit.tpl.html",
    "<section data-ng-init=\"article.findOne()\">\n" +
    "	<form class=\"form-horizontal\" data-ng-submit=\"update()\">\n" +
    "		<div class=\"control-group\">\n" +
    "			<label class=\"control-label\" for=\"title\">Title</label>\n" +
    "\n" +
    "			<div class=\"controls\">\n" +
    "				<input type=\"text\" data-ng-model=\"article.title\" id=\"title\" placeholder=\"Title\" required>\n" +
    "				</input>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"control-group\">\n" +
    "			<label class=\"control-label\" for=\"content\">Content</label>\n" +
    "\n" +
    "			<div class=\"controls\">\n" +
    "				<textarea data-ng-model=\"article.content\" id=\"content\" cols=\"30\" rows=\"10\" placeholder=\"Content\">\n" +
    "				</textarea>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"control-group\">\n" +
    "			<div class=\"controls\">\n" +
    "				<input type=\"submit\" class=\"btn\">\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "</section>");
}]);

angular.module("scripts/modules/article/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("scripts/modules/article/list.tpl.html",
    "<a ui-sref=\"article.create\">Create One</a>\n" +
    "<section data-ng-init=\"article.find()\">\n" +
    "	<ul class=\"articles unstyled\">\n" +
    "		<li data-ng-repeat=\"item in articles\">\n" +
    "			<span>{{item.created | date:'medium'}}</span> /\n" +
    "			<span>{{item.user.name}}</span>\n" +
    "			<h2><a ui-sref=\"article.detail({_id: item._id})\">{{item.title}}</a></h2>\n" +
    "			<div>{{item.content}}</div>\n" +
    "		</li>\n" +
    "	</ul>\n" +
    "	<h1 data-ng-hide=\"!articles || articles.length\">No articles yet. <br> Why don't you <a ui-sref=\"article.create\">Create One</a>?</h1>\n" +
    "</section>");
}]);

angular.module("scripts/modules/article/view.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("scripts/modules/article/view.tpl.html",
    "<section data-ng-controller=\"ArticlesController\" data-ng-init=\"findOne()\">\n" +
    "	<span>{{article.created | date:'medium'}}</span> /\n" +
    "	<span>{{article.user.name}}</span>\n" +
    "	<h2>{{article.title}} <a data-ng-show=\"global.user._id == article.user._id\" href=\"/#!/articles/{{article._id}}/edit\">edit</a></h2>\n" +
    "	<div>{{article.content}}</div>\n" +
    "</section>");
}]);
