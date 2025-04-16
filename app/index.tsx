import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const buttons = [
  ['C', 'x^y', '<', '/'],
  ['7', '8', '9', 'X'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['=', '0', ',', '=']
];

export default function Calculadora() {
  const [display, setDisplay] = useState('');

  const handlePres = (value: string) => {
    if (value === 'C') {
      setDisplay('');
    } else if (value === '<') {
      setDisplay(display.slice(0, -1));
    } else if (value === '=') {
      try {
        const troca = display
          .replace(/x\^y/, '**')
          .replace(/x/gi, '*')
          .replace(/,/g, '.');
        setDisplay(eval(troca).toString());
      } catch (e) {
        setDisplay('Error');
      }
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{display || '0'}</Text>
      </View>

      <View>
        {buttons.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((botao, j) => (
              <TouchableOpacity
                key={j}
                style={styles.button}
                onPress={() => handlePres(botao)}
              >
                <Text style={styles.buttonText}>{botao}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  display: {
    backgroundColor: '#999',
    height: 100,
    justifyContent: 'flex-end',
    padding: 10,
    alignItems: 'flex-end',
    borderRadius: 10,
    marginBottom: 10,
  },
  displayText: {
    fontSize: 40,
    color: 'blue',
  },
  buttonsConteiner: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#aaa",
    borderRadius: 30,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});