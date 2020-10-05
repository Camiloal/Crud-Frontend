<template>
  <div style="margin: 0 auto; width: 37%">
    <Toast />
    <Panel header="Categorias">
      <Menubar :model="items" />
      <br />
      <DataTable
        :value="categorias"
        :paginator="true"
        :rows="10"
        selectionMode="single"
        :selection.sync="selectedCategoria"
        dataKey="id_categoria"
      >
        <Column field="id_categoria" header="ID"></Column>
        <Column field="tipo" header="Tipo de categoria"></Column>
      </DataTable>
    </Panel>

    <Dialog header="Crear Categoria" :visible.sync="displayModal" :modal="true">
      <span class="p-float-label">
        <InputText
          id="username"
          type="text"
          v-model="categoria.tipo"
          style="width: 100%"
        />
        <label for="tipo">Tipo de categoria</label>
      </span>
      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          @click="closeModal"
          class="p-button-text"
        />
        <Button label="Guerdar" icon="pi pi-check" @click="save" autofocus />
      </template>
    </Dialog>

    <Dialog
      header="Editar Categoria"
      :visible.sync="displayModalEdit"
      :modal="true"
    >
      <span class="p-float-label">
        <InputText
          id="username"
          type="text"
          v-model="categoria.tipo"
          style="width: 100%"
        />
        <label for="tipo">Tipo de categoria</label>
      </span>
      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          @click="closeEditModal"
          class="p-button-text"
        />
        <Button label="Editar" icon="pi pi-check" @click="edit" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import CategoriaService from "../service/CategoriaService";
export default {
  name: "CrudApp",
  data() {
    return {
      categorias: null,
      categoria: {
        tipo: null,
      },
      selectedCategoria: {
        id_categoria: null,
        tipo: null,
      },
      items: [
        {
          label: "Nuevo",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.showSaveModal();
          },
        },
        {
          label: "Editar",
          icon: "pi pi-fw pi-pencil",
          command: () => {
            this.showEditModal();
          },
        },
        {
          label: "Eliminar",
          icon: "pi pi-fw pi-trash",
          command: () => {
            this.delete();
          },
        },
        {
          label: "Refrescar",
          icon: "pi pi-fw pi-refresh",
          command: () => {
            this.getAll();
          },
        },
      ],
      displayModal: false,
      displayModalEdit: false,
    };
  },
  categoriaService: null,
  created() {
    this.categoriaService = new CategoriaService();
  },
  mounted() {
    this.getAll();
  },

  methods: {
    getAll() {
      this.categoriaService.getAll().then((data) => {
        this.categorias = data.data;
      });
    },
    save() {
      this.categoriaService.save(this.categoria).then((data) => {
        if (data.status === 202) {
          this.categoria = {
            tipo: null,
          };
          this.closeModal();
          this.getAll();
        }
      });
    },
    edit() {
      this.categoriaService.edit(this.selectedCategoria).then((data) => {
        if (data.status === 202) {
          this.selectedCategoria = {
            id_categoria: null,
            tipo: null,
          };
          this.closeEditModal();
          this.getAll();
        }
      });
    },
    showSaveModal() {
      this.displayModal = true;
    },
    showEditModal() {
      this.categoria = this.selectedCategoria;
      this.displayModalEdit = true;
    },
    closeModal() {
      this.displayModal = false;
    },
    closeEditModal() {
      this.displayModalEdit = false;
    },
    delete() {
      if (
        confirm(
          "¿Esta seguro que desea eliminar la Categoria " +
            this.selectedCategoria.tipo +
            "?"
        )
      ) {
        this.categoriaService
          .delete(this.selectedCategoria.id_categoria)
          .then((data) => {
            if (data.status === 200) {
              this.getAll();
              this.$toast.add({
                severity: "success",
                summary: "Atencion!!",
                detail: "Se elimino la categoria correctamente",
                life: 3000,
              });
            }
          });
      }
    },
  },
};
</script>

<style></style>
