/**
 * ui-select美化插件
 */
+ function($) {
    'use strict';
    var defaults = {
        width: null,
        wrapClass: '',
        onChange: null,
        onClick: null
    };
    $.fn.ui_select = function(options) {
        var _this = $(this);
        if (_this.length) {
            if (_this.length == 1)
                return new UI_select(_this, options);
            _this.each(function(index, el) {
                new UI_select($(el), options);
            })
        }
    };


    function UI_select(el, opt) {
        this.el = el;
        this._opt = $.extend({}, defaults, opt);
        this._doc = $(document);
        this._win = $(window);
        return this._init();
    }
    UI_select.prototype = {
        // init初始化
        _init: function() {
            var _data = this.el.data('ui-select');
            if (_data)
                return _data;
            else
                this.el.data('ui-select', this);
            this._setHtml();
            this._bindEvent();
        },
        // 组建并获取相关的dom元素
        _setHtml: function() {
            this.el.wrap('<div tabindex="0" class="ui-select-wrap ' + this._opt.wrapClass + '"></div>')
                .after('<div class="ui-select-input"></div><i class="ui-select-arrow"></i><ul class="ui-select-list"></ul>');
            var _w = this._opt.width ? this._opt.width - 17 : this.el.outerWidth() - 17;
            this._wrap = this.el.parent('.ui-select-wrap').css('width', _w);
            this._input = this.el.next('.ui-select-input');
            this._list = this._wrap.children('.ui-select-list');
            this.el.prop('disabled') ? this.disable() : null;
            var _ohtml = '';
            this.el.find('option').each(function(index, el) {
                var _this = $(el),
                    _text = _this.text(),
                    _value = _this.prop('value'),
                    _selected = _this.prop('selected') ? 'selected' : '',
                    _disabled = _this.prop('disabled') ? ' disabled' : '';
                _ohtml += '<li title="' + _text + '" data-value="' + _value + '" class="' + _selected + _disabled + '">' + _text + '</li> ';
            });
            this._list.html(_ohtml);
            this._items = this._list.children('li');
            this.val(this.el.val());
            
            var _txt = this._list.children('li.selected').text();
            this._input.text(_txt).attr('title', _txt);;
        },
        // 绑定事件
        _bindEvent: function() {
            var _this = this;
            // 元素点击事件
            _this._items.on('click', function(e) {
                var _self = $(this),
                    _val = _self.attr('data-value'),
                    _onChange = !_self.hasClass('selected');
                if (_self.hasClass('disabled'))
                    return;
                _this.val(_val);
                if (_onChange) {
                    _this._changeBack(_val, _self);
                }
                _this._clickBack(_val, _self);
            });
            // select点击事件
            _this._wrap.on('click', function(event) {
                if (_this._disabled)
                    return;
                event.stopPropagation();
                var _lists = $('.ui-select-list');
                _this._doc.one('click', function() {
                    _lists.hide();
                })
                _lists.not(_this._list).hide();
                _this._list.toggle();
            });
        },
        // 获取/设置值
        val: function(value) {
            if (value === undefined)
                return this.el.val();
            this.el.val(value);
            var _selectedLi = this._list.children('li[data-value="' + value + '"]');
            _selectedLi.addClass('selected').siblings('li').removeClass('selected');
            this._input.html(_selectedLi.text()).attr('title', _selectedLi.text());;
        },

        // 值改变事件
        onChange: function(value, item) {},
        // 点击事件
        onClick: function(value, item) {},

        // change 触发
        _changeBack: function(value, item) {
            this.el.change();
            this.onChange(value, item);
            if (typeof this._opt.onChange == 'function')
                this._opt.onChange.call(this, value, item);
        },
        // 禁用
        disable: function() {
            this._disabled = true;
            this._wrap.addClass('disabled');
            return this;
        },
        // 启用
        enable: function() {
            this._disabled = false;
            this._wrap.removeClass('disabled');
            return this;
        },

        // click 触发
        _clickBack: function(value, item) {
            this.onClick(value, item);
            if (typeof this._opt.onClick == 'function')
                this._opt.onClick.call(this, value, item);
        }
    };
}(jQuery);
