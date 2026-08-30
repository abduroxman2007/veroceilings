import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Link from './LocalizedLink';
import '../styles/CeilingCalculator.css';

const CeilingCalculator = () => {
  const { t } = useTranslation();

  const [ceilingType, setCeilingType] = useState('grilyato'); // 'grilyato' | 'armstrong' | 'slat'
  const [cellSize, setCellSize] = useState('100x100'); // For Grilyato
  const [armstrongType, setArmstrongType] = useState('metal'); // 'metal' | 'gypsum' | 'washable'
  const [slatType, setSlatType] = useState('cube100'); // 'classic84' | 'cube100' | 'linear150'
  const [color, setColor] = useState('white');
  const [length, setLength] = useState(6);
  const [width, setWidth] = useState(5);

  const colors = [
    { id: 'white', name: t('calculator.colors.white', { defaultValue: 'Белый RAL 9003' }), hex: '#ffffff' },
    { id: 'black', name: t('calculator.colors.black', { defaultValue: 'Черный RAL 9005' }), hex: '#111827' },
    { id: 'graphite', name: t('calculator.colors.graphite', { defaultValue: 'Графит RAL 7024' }), hex: '#475569' },
    { id: 'metallic', name: t('calculator.colors.metallic', { defaultValue: 'Металлик RAL 9006' }), hex: '#94a3b8' },
    { id: 'wood', name: t('calculator.colors.wood', { defaultValue: 'Дерево (Дуб)' }), hex: '#b45309' },
  ];

  const grilyatoCellData = {
    '50x50': { mamaPapaPerM2: 31, name: '50x50 мм (Премиум глухость)' },
    '75x75': { mamaPapaPerM2: 20, name: '75x75 мм (Высокая плотность)' },
    '100x100': { mamaPapaPerM2: 14, name: '100x100 мм (Стандартный)' },
    '150x150': { mamaPapaPerM2: 9, name: '150x150 мм (Для высоких потолков)' },
    '200x200': { mamaPapaPerM2: 6, name: '200x200 мм (Экономичный)' },
  };

  const calculation = useMemo(() => {
    const numL = Math.max(1, parseFloat(length) || 0);
    const numW = Math.max(1, parseFloat(width) || 0);
    const area = Math.round(numL * numW * 10) / 10;
    const perimeter = Math.round(2 * (numL + numW) * 10) / 10;
    const lAnglePcs = Math.ceil(perimeter / 3);

    let items = [];

    if (ceilingType === 'grilyato') {
      const cellInfo = grilyatoCellData[cellSize] || grilyatoCellData['100x100'];
      const mamaPapaCount = Math.ceil(area * cellInfo.mamaPapaPerM2);
      const main24Count = Math.ceil(area * 0.7);
      const cross12Count = Math.ceil(area * 1.4);
      const cross06Count = Math.ceil(area * 1.4);
      const connectors = Math.ceil(area * 0.7);
      const hangers = Math.ceil(area * 1.0);
      const lights = Math.max(1, Math.round(area / 6));

      items = [
        {
          name: `${t('calculator.items.grilyato_mama', { defaultValue: 'Профиль решетки «Мама»' })} (600 мм, ${cellSize})`,
          qty: mamaPapaCount,
          unit: 'шт',
        },
        {
          name: `${t('calculator.items.grilyato_papa', { defaultValue: 'Профиль решетки «Папа»' })} (600 мм, ${cellSize})`,
          qty: mamaPapaCount,
          unit: 'шт',
        },
        {
          name: t('calculator.items.grilyato_main24', { defaultValue: 'Несущий направляющий профиль (2.4 м)' }),
          qty: main24Count,
          unit: 'шт',
        },
        {
          name: t('calculator.items.grilyato_cross12', { defaultValue: 'Промежуточный профиль (1.2 м)' }),
          qty: cross12Count,
          unit: 'шт',
        },
        {
          name: t('calculator.items.grilyato_cross06', { defaultValue: 'Промежуточный профиль (0.6 м)' }),
          qty: cross06Count,
          unit: 'шт',
        },
        {
          name: t('calculator.items.grilyato_connectors', { defaultValue: 'Соединитель несущих профилей' }),
          qty: connectors,
          unit: 'шт',
        },
        {
          name: t('calculator.items.l_angle', { defaultValue: 'Пристенный угловой L-профиль (3.0 м)' }),
          qty: lAnglePcs,
          unit: 'шт',
        },
        {
          name: t('calculator.items.hangers', { defaultValue: 'Регулируемые европодвесы с пружиной' }),
          qty: hangers,
          unit: 'шт',
        },
        {
          name: t('calculator.items.lights', { defaultValue: 'Рекомендуемые LED светильники Грильято' }),
          qty: lights,
          unit: 'шт',
        },
      ];
    } else if (ceilingType === 'armstrong') {
      const tilePcs = Math.ceil(area * 2.85); // 595x595 with reserve
      const main36Pcs = Math.ceil(area * 0.23); // T24 3.6m
      const cross12Pcs = Math.ceil(area * 1.38); // T24 1.2m
      const cross06Pcs = Math.ceil(area * 1.38); // T24 0.6m
      const hangers = Math.ceil(area * 0.85);
      const lights = Math.max(1, Math.round(area / 6));

      const armstrongName =
        armstrongType === 'metal'
          ? t('calculator.armstrong_types.metal', { defaultValue: 'Металлические кассеты 600х600' })
          : armstrongType === 'washable'
          ? t('calculator.armstrong_types.washable', { defaultValue: 'Моющиеся плиты с фольгой Ecofol 600х600' })
          : t('calculator.armstrong_types.gypsum', { defaultValue: 'Гипсовые плиты Армстронг 600х600' });

      items = [
        {
          name: armstrongName,
          qty: tilePcs,
          unit: 'шт',
        },
        {
          name: t('calculator.items.t_main36', { defaultValue: 'Основной несущий Т-профиль Т24/Т15 (3.6 м)' }),
          qty: main36Pcs,
          unit: 'шт',
        },
        {
          name: t('calculator.items.t_cross12', { defaultValue: 'Поперечный Т-профиль (1.2 м)' }),
          qty: cross12Pcs,
          unit: 'шт',
        },
        {
          name: t('calculator.items.t_cross06', { defaultValue: 'Поперечный Т-профиль (0.6 м)' }),
          qty: cross06Pcs,
          unit: 'шт',
        },
        {
          name: t('calculator.items.l_angle', { defaultValue: 'Пристенный угловой L-профиль (3.0 м)' }),
          qty: lAnglePcs,
          unit: 'шт',
        },
        {
          name: t('calculator.items.hangers', { defaultValue: 'Европодвесы со спицей и бабочкой' }),
          qty: hangers,
          unit: 'шт',
        },
        {
          name: t('calculator.items.lights_armstrong', { defaultValue: 'Встраиваемые LED панели 600х600' }),
          qty: lights,
          unit: 'шт',
        },
      ];
    } else if (ceilingType === 'slat') {
      let slatsCount = 0;
      let slatName = '';

      if (slatType === 'cube100') {
        slatsCount = Math.ceil((area / 0.1) / 3 * 1.05); // 100mm pitch, 3m length
        slatName = t('calculator.slat_types.cube100', { defaultValue: 'Кубообразная рейка 100 мм (L = 3.0 м)' });
      } else if (slatType === 'classic84') {
        slatsCount = Math.ceil((area / 0.084) / 3 * 1.05);
        slatName = t('calculator.slat_types.classic84', { defaultValue: 'Классическая рейка 84R (L = 3.0 м)' });
      } else {
        slatsCount = Math.ceil((area / 0.15) / 3 * 1.05);
        slatName = t('calculator.slat_types.linear150', { defaultValue: 'Широкая линейная рейка 150 мм (L = 3.0 м)' });
      }

      const stringersCount = Math.ceil((area / 1.0) / 3); // Carrier every 1.0m
      const hangers = Math.ceil(area * 1.0);

      items = [
        {
          name: slatName,
          qty: slatsCount,
          unit: 'шт',
        },
        {
          name: t('calculator.items.stringers', { defaultValue: 'Несущий стрингер / гребенка (3.0 м)' }),
          qty: stringersCount,
          unit: 'шт',
        },
        {
          name: t('calculator.items.slat_perimeter', { defaultValue: 'Пристенный торцевой П/L-профиль (3.0 м)' }),
          qty: lAnglePcs,
          unit: 'шт',
        },
        {
          name: t('calculator.items.hangers', { defaultValue: 'Регулируемые подвесы с тягой' }),
          qty: hangers,
          unit: 'шт',
        },
      ];
    }

    return {
      area,
      perimeter,
      items,
    };
  }, [length, width, ceilingType, cellSize, armstrongType, slatType, t]);

  const telegramShareText = encodeURIComponent(
    `Здравствуйте! Я рассчитал точную смету потолка на сайте Vero Ceilings:\n` +
    `• Тип системы: ${
      ceilingType === 'grilyato'
        ? `Грильято ячейка ${cellSize}`
        : ceilingType === 'armstrong'
        ? `Армстронг (${armstrongType})`
        : `Реечный (${slatType})`
    }\n` +
    `• Цвет: ${color}\n` +
    `• Размеры комнаты: ${length} м x ${width} м\n` +
    `• Общая площадь: ${calculation.area} м² | Периметр: ${calculation.perimeter} м\n` +
    `• Спецификация материалов:\n` +
    calculation.items.map((it) => `  - ${it.name}: ~${it.qty} ${it.unit}`).join('\n') +
    `\n\nПрошу отправить оптовый прайс-лист и согласовать бесплатный выезд замерщика в Ташкенте.`
  );

  return (
    <section className="calculator-section" id="calculator">
      <div className="calculator-container">
        <div className="calculator-header">
          <h2>{t('calculator.title', { defaultValue: 'Инженерный онлайн-калькулятор подвесных потолков' })}</h2>
          <p>
            {t('calculator.subtitle', {
              defaultValue: 'Точный автоматический расчет всех профилей, решеток, плит, направляющих и комплектующих под ваше помещение',
            })}
          </p>
        </div>

        <div className="calculator-card">
          {/* Inputs Column */}
          <div className="calculator-inputs">
            {/* Ceiling Type Selector */}
            <div className="calc-group">
              <label className="calc-label">
                {t('calculator.labels.type', { defaultValue: '1. Выберите потолочную систему:' })}
              </label>
              <div className="calc-type-tabs">
                <button
                  type="button"
                  className={`calc-tab-btn ${ceilingType === 'grilyato' ? 'active' : ''}`}
                  onClick={() => setCeilingType('grilyato')}
                >
                  <span style={{ fontSize: '1.3rem' }}>▦</span>
                  <span>{t('calculator.types.grilyato', { defaultValue: 'Грильято' })}</span>
                </button>
                <button
                  type="button"
                  className={`calc-tab-btn ${ceilingType === 'armstrong' ? 'active' : ''}`}
                  onClick={() => setCeilingType('armstrong')}
                >
                  <span style={{ fontSize: '1.3rem' }}>⊞</span>
                  <span>{t('calculator.types.armstrong', { defaultValue: 'Армстронг' })}</span>
                </button>
                <button
                  type="button"
                  className={`calc-tab-btn ${ceilingType === 'slat' ? 'active' : ''}`}
                  onClick={() => setCeilingType('slat')}
                >
                  <span style={{ fontSize: '1.3rem' }}>▤</span>
                  <span>{t('calculator.types.slat', { defaultValue: 'Реечный' })}</span>
                </button>
              </div>
            </div>

            {/* Grilyato Specific: Cell Size */}
            {ceilingType === 'grilyato' && (
              <div className="calc-group">
                <label className="calc-label">
                  {t('calculator.labels.cell_size', { defaultValue: '2. Размер ячейки Грильято:' })}
                </label>
                <div className="calc-options-grid">
                  {['50x50', '75x75', '100x100', '150x150', '200x200'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`calc-option-chip ${cellSize === size ? 'active' : ''}`}
                      onClick={() => setCellSize(size)}
                    >
                      {size} мм
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Armstrong Specific: Panel Type */}
            {ceilingType === 'armstrong' && (
              <div className="calc-group">
                <label className="calc-label">
                  {t('calculator.labels.armstrong_type', { defaultValue: '2. Тип плит Армстронг (600х600 мм):' })}
                </label>
                <div className="calc-options-grid">
                  <button
                    type="button"
                    className={`calc-option-chip ${armstrongType === 'metal' ? 'active' : ''}`}
                    onClick={() => setArmstrongType('metal')}
                  >
                    {t('calculator.armstrong_types.metal_short', { defaultValue: 'Металлические кассеты' })}
                  </button>
                  <button
                    type="button"
                    className={`calc-option-chip ${armstrongType === 'washable' ? 'active' : ''}`}
                    onClick={() => setArmstrongType('washable')}
                  >
                    {t('calculator.armstrong_types.washable_short', { defaultValue: 'Моющийся с фольгой Ecofol' })}
                  </button>
                  <button
                    type="button"
                    className={`calc-option-chip ${armstrongType === 'gypsum' ? 'active' : ''}`}
                    onClick={() => setArmstrongType('gypsum')}
                  >
                    {t('calculator.armstrong_types.gypsum_short', { defaultValue: 'Гипсовые плиты' })}
                  </button>
                </div>
              </div>
            )}

            {/* Slat Specific: Profile Type */}
            {ceilingType === 'slat' && (
              <div className="calc-group">
                <label className="calc-label">
                  {t('calculator.labels.slat_type', { defaultValue: '2. Тип и ширина рейки:' })}
                </label>
                <div className="calc-options-grid">
                  <button
                    type="button"
                    className={`calc-option-chip ${slatType === 'cube100' ? 'active' : ''}`}
                    onClick={() => setSlatType('cube100')}
                  >
                    {t('calculator.slat_types.cube_short', { defaultValue: 'Кубообразная 100 мм' })}
                  </button>
                  <button
                    type="button"
                    className={`calc-option-chip ${slatType === 'classic84' ? 'active' : ''}`}
                    onClick={() => setSlatType('classic84')}
                  >
                    {t('calculator.slat_types.classic_short', { defaultValue: 'Классическая 84R' })}
                  </button>
                  <button
                    type="button"
                    className={`calc-option-chip ${slatType === 'linear150' ? 'active' : ''}`}
                    onClick={() => setSlatType('linear150')}
                  >
                    {t('calculator.slat_types.linear_short', { defaultValue: 'Широкая 150 мм' })}
                  </button>
                </div>
              </div>
            )}

            {/* Color Swatches */}
            <div className="calc-group">
              <label className="calc-label">
                {t('calculator.labels.color', { defaultValue: '3. Цветовое исполнение (RAL):' })}
              </label>
              <div className="calc-color-swatches">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`calc-swatch ${color === c.id ? 'active' : ''}`}
                    onClick={() => setColor(c.id)}
                  >
                    <span className="swatch-color-dot" style={{ backgroundColor: c.hex }} />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Room Dimensions */}
            <div className="calc-group">
              <label className="calc-label">
                {t('calculator.labels.dimensions', { defaultValue: '4. Размеры помещения:' })}
              </label>
              <div className="calc-dimensions-row">
                <div className="calc-input-wrap">
                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Длина"
                  />
                  <span className="calc-input-unit">м</span>
                </div>
                <div className="calc-input-wrap">
                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Ширина"
                  />
                  <span className="calc-input-unit">м</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="calculator-results">
            <div>
              <div className="calc-results-title">
                <span>📋</span>
                <span>
                  {ceilingType === 'grilyato'
                    ? `Смета: Грильято ${cellSize}`
                    : ceilingType === 'armstrong'
                    ? `Смета: Армстронг 600х600`
                    : `Смета: Реечный потолок`}
                </span>
              </div>

              <div className="calc-summary-pills">
                <div className="calc-pill">
                  <div className="calc-pill-label">{t('calculator.results.area', { defaultValue: 'Площадь' })}</div>
                  <div className="calc-pill-val">{calculation.area} м²</div>
                </div>
                <div className="calc-pill">
                  <div className="calc-pill-label">{t('calculator.results.perimeter', { defaultValue: 'Периметр' })}</div>
                  <div className="calc-pill-val">{calculation.perimeter} м</div>
                </div>
              </div>

              <ul className="calc-breakdown-list">
                {calculation.items.map((item, idx) => (
                  <li className="calc-breakdown-item" key={idx}>
                    <span>{item.name}</span>
                    <span>
                      ~ {item.qty} {item.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="calc-cta-actions">
              <a
                href={`https://t.me/VeroCeilings?text=${telegramShareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="calc-btn-primary"
              >
                <span>✈</span>
                <span>{t('calculator.cta_telegram', { defaultValue: 'Отправить спецификацию в Telegram' })}</span>
              </a>
              <Link to="/contact" className="calc-btn-secondary">
                <span>📞</span>
                <span>{t('calculator.cta_quote', { defaultValue: 'Заказать бесплатный замер и точный расчет' })}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeilingCalculator;
