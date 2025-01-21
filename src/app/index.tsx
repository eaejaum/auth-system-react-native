import colors from "@/constants/colors";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignin() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if(error) {
      Alert.alert("Erro", error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace("/(panel)/profile/page");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>
          Dev<Text style={{ color: colors.green }}>App</Text>
        </Text>
        <Text style={styles.slogan}>O futuro da programação</Text>
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email..."
            style={styles.input}
          />
        </View>

        <View>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha..."
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Pressable style={styles.button} onPress={handleSignin}>
          <Text style={styles.buttonText}>{loading ? "Carregando..." : "Acessar"}</Text>
        </Pressable>

        <Link href="/(auth)/signup/page" style={styles.link}>
          <Text>Ainda não possui uma conta? Cadastre-se</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: colors.zinc,
  },
  header: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
  slogan: {
    fontSize: 37,
    color: colors.white,
    marginBottom: 34,
  },
  form: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 24,
    paddingLeft: 14,
    paddingRight: 14,
  },
  label: {
    color: colors.zinc,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.green,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
  },
});
