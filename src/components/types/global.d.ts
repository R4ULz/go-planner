declare interface Window {
    VLibras: {
      Widget: new (url: string) => void;
    };
  }

  declare namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      vw?: boolean; // Adiciona o atributo personalizado `vw`
      'vw-access-button'?: boolean; // Caso também seja necessário
      'vw-plugin-wrapper'?: boolean; // Caso também seja necessário
    }
  }