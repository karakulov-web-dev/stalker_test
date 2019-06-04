<?php

class Tvapicks extends AjaxResponse implements \Stalker\Lib\StbApi\Tvapicks
{
	public static $instance = null;
	public static $channels = null;
	protected $request;
	protected $year = null;
	protected $category = null;
	protected $rating = null;
	protected $countryLegend = array(
		'Aland Islands' => 'ax',
		'Burundi' => 'bi',
		'Saint Barthelemy' => 'bl',
		'Saint Martin' => 'mf',
		'Австралия' => 'au',
		'Австрия' => 'at',
		'Азербайджан' => 'az',
		'Албания' => 'al',
		'Алжир' => 'dz',
		'Американские Виргинские острова' => 'vi',
		'Американское Самоа' => 'as',
		'Ангилья' => 'ai',
		'Ангола' => 'ao',
		'Андорра' => 'ad',
		'Антигуа и Барбуда' => 'ag',
		'Аргентина' => 'ar',
		'Армения' => 'am',
		'Аруба' => 'aw',
		'Афганистан' => 'af',
		'Багамы' => 'bs',
		'Бангладеш' => 'bd',
		'Барбадос' => 'bb',
		'Бахрейн' => 'bh',
		'Беларусь' => 'by',
		'Белиз' => 'bz',
		'Бельгия' => 'be',
		'Бенин' => 'bj',
		'Бермуда' => 'bm',
		'Болгария' => 'bg',
		'Боливия' => 'bo',
		'Босния и Герцеговина' => 'ba',
		'Ботсвана' => 'bw',
		'Бразилия' => 'br',
		'Британские Виргинские Острова' => 'vg',
		'Бруней' => 'bn',
		'Буркина Фасо' => 'bf',
		'Бутан' => 'bt',
		'Вануату' => 'vu',
		'Ватикан' => 'va',
		'Великобритания' => 'gb',
		'Венгрия' => 'hu',
		'Венесуэла' => 've',
		'Восточный Тимор' => 'tl',
		'Вьетнам' => 'vn',
		'Габон' => 'ga',
		'Гаити' => 'ht',
		'Гамбия' => 'gm',
		'Гана' => 'gh',
		'Гватемала' => 'gt',
		'Гвиана' => 'gy',
		'Гвинея' => 'gn',
		'Гвинея-Бисау' => 'gw',
		'Германия' => 'de',
		'Гернси' => 'gg',
		'Гибралтар' => 'gi',
		'Гондурас' => 'hn',
		'Гонконг' => 'hk',
		'Гренада' => 'gd',
		'Гренландия' => 'gl',
		'Греция' => 'gr',
		'Грузия' => 'ge',
		'Гуам' => 'gu',
		'Дания' => 'dk',
		'Демократическая Республика Конго' => 'cd',
		'Джерси' => 'je',
		'Джибути' => 'dj',
		'Доминика' => 'dm',
		'Доминиканская Республика' => 'do',
		'Европейский союз' => 'eu',
		'Египет' => 'eg',
		'Замбия' => 'zm',
		'Западная Сахара' => 'eh',
		'Зимбабве' => 'zw',
		'Израиль' => 'il',
		'Индия' => 'in',
		'Индонезия' => 'id',
		'Иордания' => 'jo',
		'Ирак' => 'iq',
		'Иран' => 'ir',
		'Ирландия' => 'ie',
		'Исландия' => 'is',
		'Испания' => 'es',
		'Италия' => 'it',
		'Йемен' => 'ye',
		'КНДР' => 'kp',
		'Кабо-Верде' => 'cv',
		'Казахстан' => 'kz',
		'Каймановы Острова' => 'ky',
		'Камбоджа' => 'kh',
		'Камерун' => 'cm',
		'Канада' => 'ca',
		'Канарские Острова' => 'ic',
		'Катар' => 'qa',
		'Кения' => 'ke',
		'Кипр' => 'cy',
		'Киргизия' => 'kg',
		'Кирибати' => 'ki',
		'Китай' => 'cn',
		'Колумбия' => 'co',
		'Коморы' => 'km',
		'Конго' => 'cg',
		'Корея' => 'kr',
		'Южная Корея' => 'kr',
		'Коста-Рика' => 'cr',
		'Кот дИвуар' => 'ci',
		'Куба' => 'cu',
		'Кувейт' => 'kw',
		'Курасао' => 'cw',
		'Лаос' => 'la',
		'Латвия' => 'lv',
		'Лесото' => 'ls',
		'Либерия' => 'lr',
		'Ливан' => 'lb',
		'Ливия' => 'ly',
		'Литва' => 'lt',
		'Лихтенштейн' => 'li',
		'Люксембург' => 'lu',
		'Маврикий' => 'mu',
		'Мавритания' => 'mr',
		'Мадагаскар' => 'mg',
		'Майотта' => 'yt',
		'Макао' => 'mo',
		'Македония' => 'mk',
		'Малави' => 'mw',
		'Малайзия' => 'my',
		'Мали' => 'ml',
		'Мальдивы' => 'mv',
		'Мальта' => 'mt',
		'Марокко' => 'ma',
		'Мартиника' => 'mq',
		'Маршалловы Острова' => 'mh',
		'Мексика' => 'mx',
		'Микронезия' => 'fm',
		'Мозамбик' => 'mz',
		'Молдавия' => 'md',
		'Монако' => 'mc',
		'Монголия' => 'mn',
		'Монтсеррат' => 'ms',
		'Мьянма' => 'mm',
		'Намибия' => 'na',
		'Науру' => 'nr',
		'Непал' => 'np',
		'Нигер' => 'ne',
		'Нигерия' => 'ng',
		'Нидерландские Антильские острова' => 'an',
		'Нидерланды' => 'nl',
		'Никарагуа' => 'ni',
		'Ниуэ' => 'nu',
		'Новая Зеландия' => 'nz',
		'Новая Каледония' => 'nc',
		'Норвегия' => 'no',
		'Норфолк' => 'nf',
		'ОАЭ' => 'ae',
		'Оман' => 'om',
		'Остров Мэн' => 'im',
		'Остров Святой Елены' => 'sh',
		'Острова Кука' => 'ck',
		'Острова Питкэрн' => 'pn',
		'Пакистан' => 'pk',
		'Палау' => 'pw',
		'Палестинские территории' => 'ps',
		'Панама' => 'pa',
		'Папуа Новая Гвинея' => 'pg',
		'Парагвай' => 'py',
		'Перу' => 'pe',
		'Польша' => 'pl',
		'Португалия' => 'pt',
		'Пуэрто-Рико' => 'pr',
		'Россия' => 'ru',
		'Руанда' => 'rw',
		'Румыния' => 'ro',
		'США' => 'us',
		'Сальвадор' => 'sv',
		'Самоа' => 'ws',
		'Сан-Марино' => 'sm',
		'Сан-Томе и Принсипи' => 'st',
		'Саудовская Аравия' => 'sa',
		'Свазиленд' => 'sz',
		'Северные Марианские Острова' => 'mp',
		'Сейшелы' => 'sc',
		'Сенегал' => 'sn',
		'Сент-Винсент и Гренадины' => 'vc',
		'Сент-Китс и Невис' => 'kn',
		'Сент-Люсия' => 'lc',
		'Сербия' => 'rs',
		'Сингапур' => 'sg',
		'Сирия' => 'sy',
		'Словакия' => 'sk',
		'Словения' => 'si',
		'Соломоновы Острова' => 'sb',
		'Сомали' => 'so',
		'СССР' => 'su',
		'Судан' => 'sd',
		'Суринам' => 'sr',
		'Сьерра Леоне' => 'sl',
		'Таджикистан' => 'tj',
		'Тайвань' => 'tw',
		'Тайланд' => 'th',
		'Танзания' => 'tz',
		'Того' => 'tg',
		'Токелау' => 'tk',
		'Тонга' => 'to',
		'Тринидад и Тобаго' => 'tt',
		'Тувалу' => 'tv',
		'Тунис' => 'tn',
		'Туркмения' => 'tm',
		'Турция' => 'tr',
		'Тёркс и Кайкос' => 'tc',
		'Уганда' => 'ug',
		'Узбекистан' => 'uz',
		'Украина' => 'ua',
		'Уоллис и Футуна' => 'wf',
		'Уругвай' => 'uy',
		'Фарерские острова' => 'fo',
		'Фиджи' => 'fj',
		'Филиппины' => 'ph',
		'Финляндия' => 'fi',
		'Фолклендские острова' => 'fk',
		'Франция' => 'fr',
		'Французская Полинезия' => 'pf',
		'Французские Южные и Антарктические территории' => 'tf',
		'Хорватия' => 'hr',
		'Центральноафриканская Республика' => 'cf',
		'Чад' => 'td',
		'Черногория' => 'me',
		'Чехия' => 'cz',
		'Чили' => 'cl',
		'Швейцария' => 'ch',
		'Швеция' => 'se',
		'Шри-Ланка' => 'lk',
		'Эквадор' => 'ec',
		'Экваториальная Гвинея' => 'gq',
		'Эритрея' => 'er',
		'Эстония' => 'ee',
		'Эфиопия' => 'et',
		'Южная Георгия и Южные Сандвичевы острова' => 'gs',
		'Южно-Африканская Республика' => 'za',
		'Южный Судан' => 'ss',
		'Ямайка' => 'jm',
		'Япония' => 'jp',
	);

	const MAX_PAGE_ITEMS = 10;

	public static function getInstance(){
		if (self::$instance == null)
		{
			self::$instance = new self;
		}
		return self::$instance;
	}
	
	public function __construct(){
		$this->request = $this->parseRequestVar($_REQUEST);
		parent::__construct();
	}

	private function parseRequestVar($req) {
		return $req;
	}

	private function getCountryCode($country) {

		$countryArr = explode(", ", $country);

		if(isset($this->countryLegend[$countryArr[0]])) {
			return $this->countryLegend[$countryArr[0]];
		}

		return '';
	}

	private function getYear() {

		$year = null;

		if(isset($this->request['year']) && $this->request['year'] !== '') {
			$year = array('year' => $this->request['year']);
		}

		return $year;
	}

	private function getCategory() {

		$category = null;

		if(isset($this->request['category'])) {
			$category = array('category' => '%' . $this->request['category'] . '%');
		}

		return $category;
	}

	private function getRating() {

		$rating = null;

		if(isset($this->request['rating']) && $this->request['rating'] !== '') {
			$rating = array('rating<' => $this->request['rating']);
		}
		return $rating;
	}

	private function getCountry() {

		$country = null;

		if(isset($this->request['country'])) {
			$country = array('country' => '%' . $this->request['country'] . '%');
		}
		return $country;
	}

	private function getChannelsPr() {

		$query = Mysql::getInstance()
			->select('id, name, hd')
			->from('itv')
			->where(
				array(
					'status' => 1,
				)
			);

		$result = $query
			->get()
			->all();

		$channels = array();

		foreach ($result as $value) {
			$channels[$value['id']] = array(
				'name' => $value['name'],
				'hd' => $value['hd']
			);
		}

		return $channels;
	}

	public function getChannels() {

		if (self::$channels == null) {
			self::$channels = self::getChannelsPr();
		}

		return self::$channels;
	}

	public function getMovies() {

		if(isset($this->request['shift'])) {
			$shift = (int)$this->request['shift'];
			$shift = $shift * self::MAX_PAGE_ITEMS;
		} else {
			$shift = 0;
		}

		self::getChannels();

		$itv = new Itv();
		$userChannels = $itv->getAllUserChannelsIds();

		$query = Mysql::getInstance()
			->select('id, ch_id, time, name, category, descr, director, actor, duration, img, country, year, rating')
			// ->select('id, ch_id, time, name, category, descr, duration, "" as img, "Зимбабве" as country, 2020 as year, 10500 as rating')
			->from('epg')
			->where(
				array(
					'time>' => date(Mysql::DATETIME_FORMAT, strtotime('-115 hour')),
					'time_to<' => date(Mysql::DATETIME_FORMAT)
				)
			)
			// ->like(array(
			// 	'category' => '%фильм%',
			// 	)
			// )
			->in('basecat', ['Фильм', 'Для взрослых'])
			// ->in('basecat', ['Фильм'])
			->where($this->getYear())
			->where($this->getRating())
			->like($this->getCountry())
			->like($this->getCategory())
			->in('ch_id', $userChannels);

		$query_rows = clone $query;
		
		$counter = $query_rows->nolimit()->nogroupby()->noorderby()->count()->get()->counter();

		$result = $query
			->limit(self::MAX_PAGE_ITEMS, $shift)
			->get()
			->all();

		foreach ($result as $key => $value) {
			$result[$key]['flag'] = $this->getCountryCode($result[$key]['country']);
			$result[$key]['ch_prop'] = self::$channels[$result[$key]['ch_id']];
		}
		
		// return $this->getResponse('prepareData');
		return array(
			'total_items' => (int)$counter,
			'total_pages' => ceil($counter / self::MAX_PAGE_ITEMS),
			'max_page_items' => self::MAX_PAGE_ITEMS,
			'data' => $result,
		);
	}

	public function getGenres() {
		$genres = [
			'Все' => '',
			'Боевик' => 'Боевик',
			'Вестерн' => 'Вестерн',
			'Военный' => 'Военный',
			'Детектив' => 'Детектив',
			'Детский' => 'Детский',
			'Драма' => 'Драма',
			'Исторический' => 'Исторический',
			'Комедия' => 'Комедия',
			'Криминал' => 'Криминал',
			'Мелодрама' => 'Мелодрама',
			'Мюзикл' => 'Мюзикл',
			'Приключения' => 'Приключения',
			'Семейный' => 'Семейный',
			'Сказка' => 'Сказка',
			'Трагикомедия' => 'Трагикомедия',
			'Триллер' => 'Триллер',
			'Ужасы' => 'Ужасы',
			'Фантастика' => 'Фантастика',
			'Фэнтези' => 'Фэнтези',
			'Образование' => 'Эротика',
		];

		return array(
			'total_items' => sizeof($genres),
			'data' => $genres,
		);
	}

	public function getTest() {
		return Stb::getInstance();
		// return Itv::getAllUserChannelsIds();
		// $i = new Itv();
		// return $i->getAllUserChannelsIds();
	}
}