import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const App = () => {
  const [textValue, setTextValue] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTask = () => {
    setTaskList((currentValue) => [
      ...currentValue,
      {
        id: new Date(),
        task: textValue,
        completed: "Pendiente",
      },
    ]);
    setTextValue("");
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleDeleteItem = () => {
    setTaskList((current) =>
      current.filter((item) => item.id !== selectedItem.id)
    );
    setModalVisible(false);
  };

  const handleCancelItem = () => {
    setModalVisible(false);
    setSelectedItem({});
  };

  const handleCompleteItem = () => {
    const index = taskList.findIndex((item) => item === selectedItem);
    taskList[index].completed = "Completado";
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTopNav}>
        <TextInput
          style={styles.input}
          placeholder="Descripción de Tarea"
          value={textValue}
          onChangeText={setTextValue}
        />
        <Button title="+" onPress={handleAddTask} />
      </View>
      <View style={styles.containerTask}>
        <FlatList
          style={styles.FlatList}
          data={taskList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.containerRenderList}
              onPress={() => handleSelectItem(item)}
            >
              <Text>{item.task}</Text>
              <Text>{item.completed}</Text>
            </TouchableOpacity>
            // <RenderList item={item} handleSelectItem={handleSelectItem} />
          )}
        />
      </View>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.containerModal}>
          <View style={styles.containerCard}>
            <Text>Seleccionaste:</Text>
            <Text style={styles.textSelected}>{selectedItem.task}</Text>
            <View style={styles.containerBoxButton}>
              <Button title="Eliminar" onPress={handleDeleteItem} />
              <Button title="Cancelar" onPress={handleCancelItem} />
              <Button title="Finalizado" onPress={handleCompleteItem} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
  },
  containerTopNav: {
    flexDirection: "row",
    width: "80%",
    gap: 10,
  },
  input: {
    borderWidth: 1,
    width: "80%",
    borderRadius: 5,
    paddingLeft: 10,
  },
  containerTask: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  FlatList: {
    width: "80%",
    marginTop: 10,
  },
  containerModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccccccaa",
  },
  containerCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderWidth: 1,
    borderRadius: 10,
    gap: 15,
  },
  textSelected: {
    fontWeight: "bold",
  },
  containerBoxButton: {
    flexDirection: "row",
    gap: 10,
  },
  containerRenderList: {
    backgroundColor: "#cccccc",
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default App;
