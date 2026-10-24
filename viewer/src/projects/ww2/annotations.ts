export type Fact={heading:string;main:string;sub:string;items?:string[]};
export const facts:Record<string,Fact[]>={
opening:[
{heading:'1945: A VERY STRANGE WINNERS’ PODIUM',main:'VICTORY ≠ PROSPERITY',sub:'Britain · Soviet Union · Germany · Japan',items:['VICTORY','COST','RECOVERY']},
{heading:'A GENERATION LATER',main:'THE PICTURE CHANGES',sub:'Factories, migration, rebuilding and a new international order',items:['CANADA','AUSTRALIA','UNITED STATES']},
{heading:'WHAT DOES “GAINED” MEAN?',main:'MORE THAN ONE ANSWER',sub:'Factories? Influence? Territory? Everyday life?',items:['ECONOMY','POWER','LIVING STANDARDS']},
{heading:'TWO CLOCKS, THREE SCORECARDS',main:'1945 IS NOT THE WHOLE STORY',sub:'State power and household prosperity are different measures',items:['EARLY POSTWAR','1950s–1960s']}
],
rules:[
{heading:'CHOOSE THE MEASURE FIRST',main:'ECONOMY · POWER · RECOVERY',sub:'Different questions produce different answers',items:['PRODUCTION','INFLUENCE','LIVING STANDARDS']},
{heading:'CHOOSE THE TIME WINDOW',main:'TWO CLOCKS',sub:'Six selected cases, not a complete global ranking',items:['1945 / EARLY POSTWAR','1950s–1960s']},
{heading:'RECOVERY IS NOT A REWARD FOR DESTRUCTION',main:'REBUILDING ≠ BENEFITING FROM RUIN',sub:'A conceptual comparison, not a monetary calculation',items:['DAMAGE','REBUILDING','NEW CAPACITY']}
],
industry:[
{heading:'UNITED STATES: AN EXISTING INDUSTRIAL GIANT',main:'MOBILIZATION AT ENORMOUS SCALE',sub:'The war expanded strengths that already existed',items:['SKILLS','MACHINES','ORGANIZATION']},
{heading:'THE FACTORY THAT WAS STILL STANDING',main:'LEADING INDUSTRIAL PRODUCER · 1945',sub:'Main continental industrial centers avoided sustained destruction',items:['WORKERS','ELECTRICITY','FACTORIES']},
{heading:'TWO WORKSHOPS, DIFFERENT STARTING POINTS',main:'READY TO PRODUCE / FIRST REPAIR',sub:'A simplified explanation of relative advantage',items:['WORKING ROOF','REPAIR NEEDED']},
{heading:'PEACE CREATED DEMAND — AND A DIFFICULT TRANSITION',main:'RECONSTRUCTION NEEDED SUPPLIES',sub:'Shortages · inflation · strikes · conversion to civilian production',items:['FOOD','MACHINERY','MATERIALS']},
{heading:'RELATIVE ADVANTAGE DID NOT REMOVE THE COST',main:'POSITION ≠ A PROFIT STATEMENT',sub:'Military deaths, discrimination and Japanese American incarceration',items:['FAMILIES','RIGHTS','SACRIFICES']}
],
dollar:[
{heading:'BRETTON WOODS · 1944',main:'44 COUNTRIES',sub:'Designing a framework for international monetary cooperation',items:['IMF','WORLD BANK ROOTS']},
{heading:'THE POSTWAR MONETARY FRAMEWORK',main:'THE DOLLAR AT THE CENTER',sub:'Historical system: fixed but adjustable exchange rates',items:['PARTICIPATING CURRENCIES','US DOLLAR','$35 / OUNCE OF GOLD']},
{heading:'RECONSTRUCTION AND STRATEGY',main:'AID + PARTNERSHIPS',sub:'The Marshall Plan helped recovery and served strategic interests',items:['ASSISTANCE','REBUILDING','PARTNERS']},
{heading:'INDUSTRY, FINANCE AND STRATEGIC REACH',main:'THE STRONGEST OVERALL POSITION',sub:'An editorial assessment across the stated criteria',items:['PRODUCTIVE CAPACITY','FINANCIAL INFLUENCE','PARTNERSHIPS']}
],
sovietpower:[
{heading:'SOVIET UNION: THE GEOPOLITICAL SCORECARD',main:'MILITARY POSITION → POLITICAL LEVERAGE',sub:'The Red Army’s role and occupation of much of Eastern Europe',items:['MILITARY POSITION','POLITICAL LEVERAGE']},
{heading:'THE EARLY POSTWAR YEARS',main:'A SUPERPOWER EMERGES',sub:'Soviet-backed governments consolidated control across much of Eastern Europe',items:['MOSCOW','REGIONAL GOVERNMENTS']},
{heading:'INFLUENCE IS NOT THE SAME AS ANNEXATION',main:'CONTROL CAN EXTEND BEYOND BORDERS',sub:'States such as Poland and Hungary remained formally separate',items:['FORMAL TERRITORY','SPHERE OF INFLUENCE']},
{heading:'TERRITORIAL CHANGES WERE CONTESTED',main:'NOT A UNIVERSALLY ACCEPTED MAP',sub:'Many Western governments did not recognize the Baltic annexations',items:['TERRITORY','RECOGNITION','DISPUTE']}
],
sovietcost:[
{heading:'THE OTHER SIDE OF THE SCORECARD',main:'TENS OF MILLIONS OF LIVES LOST',sub:'Soviet military and civilian deaths; exact estimates vary',items:['PEOPLE','FAMILIES','COMMUNITIES']},
{heading:'RECONSTRUCTION AFTER DEVASTATION',main:'MORE POWER, ENORMOUS LOSS',sub:'Homes, farms, transport and productive capacity needed repair',items:['HOMES','FARMS','TRANSPORT']},
{heading:'A SUPERPOWER IS NOT A HOUSEHOLD WINDFALL',main:'NAME THE CATEGORY',sub:'Geopolitical gains do not establish household prosperity',items:['STATE POWER','HOUSEHOLD LIFE']},
{heading:'THE COLUMNS DESCRIBE DIFFERENT THINGS',main:'NO SINGLE BALANCE SHEET',sub:'Human loss cannot be canceled against territorial influence',items:['GOVERNMENT','ECONOMY','FAMILIES']}
],
canada:[
{heading:'CANADA: THE LESS OBVIOUS TRANSFORMATION',main:'AN EXPANDING INDUSTRIAL BASE',sub:'Wartime orders accelerated existing industrial capabilities',items:['FACTORIES','TECHNOLOGY','SKILLS']},
{heading:'CANADA’S WARTIME ECONOMY',main:'FULL EMPLOYMENT BY 1942',sub:'Canadian War Museum; conversion to civilian production still mattered',items:['TRAINING','MACHINERY','CIVILIAN PRODUCTION']},
{heading:'A STRONGER DIPLOMATIC VOICE',main:'NATO FOUNDING MEMBER · 1949',sub:'A larger international role, without becoming a superpower',items:['CAPACITY','CONNECTIONS','DIPLOMACY']},
{heading:'GAINS AND COSTS EXISTED TOGETHER',main:'NOT AN UNTOUCHED SPECTATOR',sub:'Overseas losses · Atlantic danger · Japanese Canadian dispossession',items:['SERVICE','SACRIFICE','INJUSTICE']}
],
australia:[
{heading:'AUSTRALIA: BUILDING AFTER THE EMERGENCY',main:'OPPORTUNITY NEEDED INVESTMENT',sub:'Wartime industrial capacity did not automatically produce prosperity',items:['WORKERS','HOMES','ELECTRICITY','INFRASTRUCTURE']},
{heading:'POSTWAR MIGRATION',main:'IMMIGRATION DEPARTMENT · 1945',sub:'Migration reshaped society, while discriminatory restrictions remained',items:['SKILLS','LABOR','COMMUNITIES']},
{heading:'SNOWY MOUNTAINS SCHEME',main:'CONSTRUCTION BEGAN · 1949',sub:'Migrants, engineering and public investment built new infrastructure',items:['DAMS','TUNNELS','POWER']},
{heading:'A CHANGING SECURITY ORIENTATION',main:'ANZUS SIGNED · 1951',sub:'The treaty entered into force in 1952',items:['AUSTRALIA','NEW ZEALAND','UNITED STATES']}
],
pivot:[
{heading:'OUR FIRST CLOCK STOPS TOO EARLY',main:'NOW MOVE A GENERATION FORWARD',sub:'Immediate position and long-run recovery answer different questions',items:['1945','1950s','1960s']},
{heading:'DEFEAT IS NOT THE END OF THE ECONOMIC STORY',main:'THE SECOND CLOCK',sub:'Following recovery without confusing it with wartime success',items:['REBUILD','TRADE','INSTITUTIONS']},
{heading:'NO SECRET BONUS FOR LOSING',main:'RECOVERY HAPPENED AFTERWARD',sub:'Policies, capabilities, international support and Cold War conditions',items:['PEOPLE','CHOICES','SUPPORT','CONTEXT']}
],
germany:[
{heading:'WEST GERMANY — NOT BOTH GERMAN STATES',main:'FEDERAL REPUBLIC · 1949',sub:'East Germany followed a different political and economic path',items:['WEST GERMANY','EAST GERMANY']},
{heading:'THE WESTERN ZONES · 1948',main:'A NEW CURRENCY AND NEW INCENTIVES',sub:'Deutsche Mark reform and changes to price controls',items:['CURRENCY','SUPPLIES','CONFIDENCE']},
{heading:'MORE THAN ONE CAUSE',main:'RECOVERY HAD MANY INGREDIENTS',sub:'Labor, capacity, investment, assistance and European cooperation',items:['SKILLS','INVESTMENT','TRADE','INSTITUTIONS']},
{heading:'THE 1950s AND 1960s',main:'A POWERFUL INDUSTRIAL RECOVERY',sub:'A national growth story did not describe every household equally',items:['OUTPUT','HOUSEHOLDS','UNEQUAL TRANSITIONS']},
{heading:'CREDIT THE REBUILDING, NOT THE RUINS',main:'DESTRUCTION WAS AN OBSTACLE',sub:'Rebuilding requires real resources and effort',items:['PEOPLE','INVESTMENT','COOPERATION']}
],
japan:[
{heading:'JAPAN: DEFEAT, OCCUPATION AND REFORM',main:'ALLIED OCCUPATION · 1945–1952',sub:'An American-led occupation reshaped political and economic institutions',items:['REBUILDING','REFORMS','PRODUCTION']},
{heading:'A COLD WAR TURN',main:'KOREAN WAR ORDERS · FROM 1950',sub:'A boost to Japan’s economy amid devastating war in Korea',items:['PROCUREMENT','REPAIRS','DEMAND']},
{heading:'ORDERS WERE NOT THE WHOLE EXPLANATION',main:'PEOPLE + CAPABILITIES + MARKETS',sub:'Investment, workers, engineering and export opportunities',items:['SKILLS','INVESTMENT','PRODUCTS','EXPORTS']},
{heading:'JAPAN · 1968',main:'SECOND-LARGEST NONCOMMUNIST ECONOMY',sub:'Historical description used by Japan’s foreign ministry',items:['CARS','ELECTRONICS','EXPORTS']},
{heading:'HOLD BOTH HISTORIES IN VIEW',main:'RECOVERY DOES NOT ERASE AGGRESSION',sub:'Later achievements do not excuse wartime suffering inflicted across Asia',items:['WARTIME RESPONSIBILITY','POSTWAR REBUILDING']}
],
independence:[
{heading:'WHAT DOES AN INDUSTRIAL RANKING LEAVE OUT?',main:'SOVEREIGNTY',sub:'Self-government is a different kind of postwar gain',items:['SELF-GOVERNMENT','POLITICAL CHOICE']},
{heading:'A CHANGING COLONIAL ORDER',main:'INDIA AND PAKISTAN · 1947',sub:'Independence movements acted within a changed international environment',items:['LONG STRUGGLES','NEW OPPORTUNITIES','INDEPENDENCE']},
{heading:'FREEDOM WAS NOT A WARTIME GIFT',main:'INDEPENDENCE ≠ INSTANT PROSPERITY',sub:'Partition brought devastating violence and displacement',items:['SOVEREIGNTY','HUMAN COST','DEVELOPMENT']},
{heading:'BRITAIN: A VICTOR UNDER PRESSURE',main:'VICTORY DID NOT FREEZE THE HIERARCHY',sub:'Financial strains and an empire facing increasing pressure',items:['VICTORY','FINANCIAL STRAIN','CHANGE']}
],
verdict:[
{heading:'OVERALL POSITION AFTER THE WAR',main:'UNITED STATES',sub:'Our clearest overall answer across economy, finance and strategic reach',items:['INDUSTRY','FINANCE','REACH']},
{heading:'DIFFERENT CATEGORIES, DIFFERENT ANSWERS',main:'KEEP THE CATEGORIES VISIBLE',sub:'Soviet power · Canadian/Australian development · German/Japanese recovery',items:['POWER','DEVELOPMENT','RECOVERY']},
{heading:'THERE IS NO UNIVERSAL PODIUM',main:'THE MAP EXPANDS WITH THE QUESTION',sub:'Sovereignty belongs in the story too',items:['PROSPERITY','INFLUENCE','INDEPENDENCE']},
{heading:'WHO COULD TURN THE PEACE INTO SOMETHING BETTER?',main:'AND FOR WHOM?',sub:'Advantages, choices and losses shaped very different outcomes',items:['STARTING CONDITIONS','CHOICES','PEOPLE']}
]
};
export const countryFor:Record<string,string>={industry:'usa',dollar:'usa',sovietpower:'ussr',sovietcost:'ussr',canada:'canada',australia:'australia',germany:'germany',japan:'japan',independence:'independence'};
export const placeFor:Record<string,string>={opening:'ruins',rules:'office',industry:'factory',dollar:'conference',sovietpower:'maproom',sovietcost:'memorial',canada:'factory',australia:'harbor',pivot:'ruins',germany:'shop',japan:'showroom',independence:'harbor',verdict:'conference'};
